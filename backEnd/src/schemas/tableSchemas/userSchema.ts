import { IUser } from '../interfaces/IUser';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import MovieRequest from './movieRequestSchema';
import Signature from './signatureSchema';
import Movie from './movieSchema';
import Evaluation from './evaluationSchema';

class User extends db.Model<IUser> implements IUser {
    public id!: number;
    public userLogin!: string;
    public userPassword!: string;
    public userAdultPassword!: string;
    public userFirstName!: string;
    public userLastName!: string;
    public userValid!: boolean;
    public userMail!: string;
    public userProfile!: number;

    public static associations: {
        requests: db.Association<User, MovieRequest>;
        signature: db.Association<User, Signature>;
        createdMovies: db.Association<User, Movie>;
        evaluations: db.Association<User, Evaluation>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        userLogin: {
            type: new db.DataTypes.STRING(200),
            allowNull: false,
        },
        userPassword: {
            type: new db.DataTypes.STRING(200),
            allowNull: false,
        },
        userAdultPassword: {
            type: new db.DataTypes.STRING(200),
            allowNull: true,
            defaultValue: '0000'
        },
        userFirstName: {
            type: new db.DataTypes.STRING(100),
            allowNull: false,
        },
        userLastName: {
            type: new db.DataTypes.STRING(100),
            allowNull: true
        },
        userValid: {
            type: db.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        userMail: {
            type: new db.DataTypes.STRING(100),
            allowNull: false,
        },
        userProfile: {
            type: new db.DataTypes.INTEGER,
            defaultValue: 3
        }
    },
    {
        tableName: "user",
        sequelize,
        timestamps: true
    }
);

export default User;