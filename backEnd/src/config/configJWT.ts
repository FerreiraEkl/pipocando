import { IUser } from '../schemas/interfaces/IUser';
import JsonWebToken from 'jsonwebtoken';

class JWT {
    //private pathToKey = path.join(__dirname, '..', 'jwtRS256.key.pub');
    //private pubKey = fs.readFileSync(this.pathToKey, 'utf-8');

    private pubKey = process.env.PRIVATE_JWT_KEY || 'testing';

    createToken(user: IUser): any {
        const id = user.id;
        const expiresIn = '1d';

        const payload = {
            sub: id,
            iat: Date.now()
        }

        const signedToken = JsonWebToken.sign(payload, this.pubKey, {
            expiresIn: expiresIn,
            //algorithm: 'RS256'
        });

        return {
            token: 'Bearer ' + signedToken,
            expires: expiresIn
        }
    }
}

export default new JWT();