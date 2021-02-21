import { IContact } from '../interfaces/IContact';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'


class Contact extends db.Model<IContact> implements IContact {
    id?: number;
    contactName!: string;
    contactPhone!: string;
    contactMail!: string;
    contactMessage!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Contact.init(
    {
        contactName: {
            type: new db.DataTypes.STRING,
            allowNull: false
        },
        contactPhone: {
            type: new db.DataTypes.STRING,
            allowNull: false
        },
        contactMail: {
            type: new db.DataTypes.STRING,
            allowNull: false
        },
        contactMessage: {
            type: new db.DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "contact",
        sequelize,
        timestamps: true
    }
);

export default Contact;