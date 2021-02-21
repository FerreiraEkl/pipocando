import JsonWebToken from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import crypto from 'crypto';

import { IUser } from '../schemas/interfaces/IUser';
import User from "../schemas/tableSchemas/userSchema";

import JWT from '../config/configJWT';
import hasher from '../config/configCrypto';
import MailConfimation from "../schemas/tableSchemas/mailConfimationSchema";
import emailService from "../services/emailService";
import Signature from '../schemas/tableSchemas/signatureSchema';

const { Op } = require("sequelize");

class AuthController {

    public async authenticate(req: Request, res: Response) {
        const user = <IUser>JSON.parse(JSON.stringify(req.user));
        return res.status(200).json({
            success: true,
            user: {
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userProfile: user.userProfile
            }
        })
    }

    public async isLoggedIn(req: Request, res: Response, next: NextFunction) {
        req.headers.authorization = req.headers.authorization?.replace("Bearer ", "").replace("bearer ", "");

        //return passport.authenticate('jwt', { session: false })(req, res, next);

        try {
            if (!req.headers.authorization)
                return res.status(401).json({ success: false, message: 'Unauthorized' });

            //var pathToKey = path.join(__dirname, '..', 'jwtRS256.key.pub');
            //var pubKey = fs.readFileSync(pathToKey, 'utf-8');

            var pubKey = process.env.PRIVATE_JWT_KEY || 'testing';

            JsonWebToken.verify(req.headers.authorization, pubKey, function (err, payload: any) {
                if (err)
                    return res.status(401).json({ success: false, message: err.message });

                User.findByPk(payload.sub).then(user => {
                    if (!user)
                        return res.status(404).json({ success: false, message: 'User not Found' });

                    req.user = user;
                    return next();

                }).catch(err => {
                    return res.status(401).json({ success: false, message: err.message });
                });
            });
        } catch (err) {
            return res.status(401).json({ success: false, message: err.message });
        }
    }

    public async isAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        var user = <IUser>JSON.parse(JSON.stringify(req.user));

        if ((user.userProfile === 0))
            return next();

        return res.status(401).json({ success: false, message: 'IsNot admin' });
    }

    public async hasValidEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        var user = <IUser>JSON.parse(JSON.stringify(req.user));

        if ((user.userProfile === 0))
            return next();

        if ((user.userValid == true))
            return next();

        return res.status(401).json({ success: false, message: 'Is not validated' });
    }

    public async hasSignature(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        var user = <IUser>JSON.parse(JSON.stringify(req.user));

        if ((user.userProfile === 0 || user.userProfile === 1))
            return next();

        return await Signature.findOne({
            where: {
                userId: user.id
            }
        }).then(signature => {
            if (!signature)
                return res.status(401).json({ success: false, message: 'Invalid Signature' });

            if (signature.signatureEnd.valueOf() < Date.now().valueOf())
                return res.status(401).json({ success: false, message: 'Invalid Signature' });

            return next();

        }).catch(err => {
            return res.status(401).json({ success: false, message: err.mesage });
        })
    }

    public async login(req: Request, res: Response): Promise<Response> {
        return await User.findOne({
            where: {
                userLogin: req.body.login
            }
        }).then(user => {

            if (!user)
                return res.status(401).json({ message: "Usuário ou senha incorretas!" });

            const isValid = hasher.compare(req.body.password, user.userPassword);

            if (isValid) {

                const tokenObject = JWT.createToken(user);

                return res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    userName: `${user.userFirstName}  ${user.userLastName}`,
                    userProfile: user.userProfile,
                    expiresIn: tokenObject.expires
                })
            }

            return res.status(401).json({ message: "Usuário ou senha incorretas!" });

        }).catch(err => {
            console.log(err);
            return res.status(401).json({ message: "Erro ao efetuar login!" });
        });
    }

    public async logout(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ success: true, message: 'Sucesso ao sair!' })
    }

    public async register(req: Request, res: Response) {

        var user = <IUser>JSON.parse(JSON.stringify(req.body));

        if (!user.userLogin)
            return res.status(400).json({ message: "Login não pode ser nulo!" });

        if (!user.userFirstName)
            return res.status(400).json({ message: "Nome de usuário não pode ser nulo!" });

        if (!user.userPassword || !req.body.userPasswordConfirm)
            return res.status(400).json({ message: "Senha e confirmação devem ser preenchidos!" });

        if (user.userPassword != req.body.userPasswordConfirm)
            return res.status(400).json({ message: "Senha e confirmação devem ser iguais!" });

        if (!user.userMail)
            return res.status(400).json({ message: "email deve ser preenchido!" });

        const usuario = user.userMail.substring(0, user.userMail.indexOf("@"));
        const dominio = user.userMail.substring(user.userMail.indexOf("@") + 1, user.userMail.length);

        if (
            !(
                (usuario.length >= 1) &&
                (dominio.length >= 3) &&
                (usuario.search("@") == -1) &&
                (dominio.search("@") == -1) &&
                (usuario.search(" ") == -1) &&
                (dominio.search(" ") == -1) &&
                (dominio.search(".") != -1) &&
                (dominio.indexOf(".") >= 1) &&
                (dominio.lastIndexOf(".") < dominio.length - 1)
            )
        ) {
            return res.status(400).json({ message: "email Invalido!" });
        }

        user.userPassword = hasher.encriptPassword(user.userPassword);

        return await User.findOne({
            where: {
                [Op.or]: [
                    { userLogin: user.userLogin },
                    { userMail: user.userMail }
                ]
            }
        }).then(async existentUser => {

            if (existentUser) {
                if (existentUser.userLogin === user.userLogin)
                    return res.status(400).json({ message: "Este usuário já existe!" });

                if (existentUser.userMail === user.userMail)
                    return res.status(400).json({ message: "Este email já está cadastrado!" });

                return res.status(400).json({ message: "Este usuário já existe!" });
            }

            return await User.create(user).then(async user => {
                await crypto.randomBytes(36, async (err, hash) => {
                    await MailConfimation.create({
                        hash: hash.toString('hex'),
                        maxValidate: getDate(),
                        userId: user.id
                    }).then(() => {
                        emailService.notifyRegister(user, hash.toString('hex'));
                        return res.status(200).json({
                            success: true
                        });
                    })
                });
            })
        }).catch(err => {
            console.log(err);
            return res.status(403).json({ message: err.message });
        });
    }

    public async confirmMail(req: Request, res: Response): Promise<Response> {
        return await MailConfimation.findOne({
            where: {
                hash: req.body.hash
            }
        }).then(hash => {
            if (hash) {
                return User.update({
                    userValid: true,
                }, {
                    where: {
                        id: hash.userId
                    }
                }).then(user => {
                    if (user) {
                        MailConfimation.destroy({
                            where: {
                                userId: hash?.userId
                            }
                        });
                        return res.status(200).json({ success: true, message: "Email validado com sucesso!" });
                    }
                    return res.status(400).json({ success: false, message: "Código não encontrado." });
                }).catch(err => {
                    console.log(err);
                    return res.status(400).json({ success: false, message: err.message });
                });
            }
            return res.status(400).json({ success: false, message: "Código não encontrado." });
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, message: err.message });
        })
    }

    public async recoverPassword(req: Request, res: Response) {
        return await User.findOne({
            where: {
                userMail: req.body.email
            }
        }).then(user => {

            if (!user)
                return res.status(404).json({ success: false, message: 'Este email não pertence a um usuário pipocando.' });

            crypto.randomBytes(6, (err, hash) => {
                MailConfimation.create({
                    hash: hash.toString('hex'),
                    maxValidate: getDate(),
                    userId: user.id
                }).then(() => {
                    emailService.recoverMail(user, hash.toString('hex'));
                    return res.status(200).json({
                        success: true
                    });
                })
            });
        }).catch(err => {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: 'Falha ao recuperar conta'
            });
        });
    }

    public async setNewPassword(req: Request, res: Response): Promise<Response> {
        if (!req.body.password || !req.body.passwordConfirm)
            return res.status(400).json({ message: "Senha e confirmação devem ser preenchidos!" });

        if (req.body.password != req.body.passwordConfirm)
            return res.status(400).json({ message: "Senha e confirmação devem ser iguais!" });

        return await MailConfimation.findOne({
            where: {
                hash: req.body.hash
            }
        }).then(async hash => {
            if (!hash)
                return res.status(404).json({ success: false, message: 'Não encontramos sua solicitação se necessário solicite novamente.' });

            return await User.update({
                userPassword: hasher.encriptPassword(req.body.password)
            }, {
                where: {
                    id: hash.userId
                }
            }).then(async affectedRows => {
                if (!affectedRows)
                    return res.status(404).json({ success: false, message: 'Não foi possivel finalizar a solicitação' });

                return await MailConfimation.destroy({
                    where: {
                        userId: hash.userId
                    }
                }).then(() => {
                    return res.status(200).json({ success: true });
                });
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        });

    }
}

function getDate() {
    var hoje = new Date();

    var dataVenc = new Date(hoje.getTime() + (2 * 60 * 60 * 1000));

    //const vencimento = dataVenc.getFullYear() + "-" + (dataVenc.getMonth() + 1) + "-" + dataVenc.getDate();

    return dataVenc;
}

export default new AuthController()