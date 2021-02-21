import { ISignature } from '../iterfaces/ISignature';
import { IUser } from '../iterfaces/IUser';
import { User } from './user.model';
export class Signature implements ISignature {

    signatureEnd: Date;
    userId?: number;

    user: User;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
