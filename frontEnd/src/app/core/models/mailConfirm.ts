import { IMailConfirm } from '../iterfaces/IMailConfirm';
import { User } from './user.model';
export class MailConfirm implements IMailConfirm {
    maxValidate?: Date;
    hash: string;
    userId?: number;

    user: User;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
