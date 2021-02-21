import { IPayment } from '../interfaces/IPayment';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import User from './userSchema';

class Payment extends db.Model<IPayment> implements IPayment {
    id?: number;
    paymentStatus!: string;
    transactionId!: string;
    payerId!: number;
    userId?: number;


    public static associations: {
        user: db.Association<Payment, User>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payment.init(
    {
        paymentStatus: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        },
        transactionId: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        },
        payerId: {
            type: new db.DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "payment",
        sequelize,
        timestamps: true
    }
);

export default Payment;