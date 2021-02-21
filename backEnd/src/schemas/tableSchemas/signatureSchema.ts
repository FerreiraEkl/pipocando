import { ISignature } from '../interfaces/ISignature';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import User from './userSchema';

class Signature extends db.Model<ISignature> implements ISignature {
    public signatureEnd!: Date;
    public userId!: number;

    public static associations: {
        user: db.Association<Signature, User>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Signature.init(
    {
        signatureEnd: {
            type: new db.DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: "signature",
        sequelize,
        timestamps:true
    }
);

export default Signature;