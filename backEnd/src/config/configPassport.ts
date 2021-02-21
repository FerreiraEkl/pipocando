import { ExtractJwt, Strategy } from 'passport-jwt';
import fs from 'fs';
import path from 'path'
import User from '../schemas/tableSchemas/userSchema';

const pathToKey = path.join(__dirname, '..', 'jwtRS256.key.pub');
const pubKey = fs.readFileSync(pathToKey, 'utf-8');

const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: pubKey,
    algorithms: ['RS256']
}

const jwtStrategy = new Strategy(passportJWTOptions, (payload, done) => {  
    console.log(payload);    
    User.findOne({
        where: {
            id: payload.sub
        }
    }).then(user => {
        if (!user)
            return done(null, false, { message: "Usuário ou senha incorretas!" });

        return done(null, user);

    }).catch(err => {
        done(err, null);
    });
});


module.exports = (passport: any) => {
    passport.use(jwtStrategy);
}