import { IMailConfirm } from '../interfaces/IMailConfirm';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import User from './userSchema';

class MailConfimation extends db.Model<IMailConfirm>
    implements IMailConfirm {

    maxValidate?: Date;
    hash!: string;
    userId!:number;

    public static associations: {
        user: db.Association<MailConfimation, User>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MailConfimation.init(
    {
        maxValidate: {
            type: new db.DataTypes.DATE,
            allowNull:false
        },
        hash: {
            type: new db.DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: "mailConfirmation",
        sequelize,
        timestamps:true
    }
);

export default MailConfimation;