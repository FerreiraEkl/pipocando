import { IMovie } from '../interfaces/IMovie';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import Evaluation from './evaluationSchema';
import User from './userSchema';
import Category from './categorySchema';
import Classification from './classificationSchema';

class Movie extends db.Model<IMovie> implements IMovie {
    id?: number;
    movieLocation!: string;
    moviePicture!: string;
    movieTitle!: string;
    movieLocked?: boolean;
    movieYear!: number;
    movieDescription!: string;
    movieAvaliation?: number;
    movieType?: string;//mimetype

    classificationId?: number;
    categoryId?: number;
    creatorId?: number;

    public static associations: {
        creator: db.Association<Movie, User>;
        category: db.Association<Movie, Category>;
        classification: db.Association<Movie, Classification>;
        evaluations: db.Association<Movie, Evaluation>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Movie.init(
    {
        movieLocation: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        },
        moviePicture: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        },
        movieTitle: {
            type: new db.DataTypes.STRING,
            allowNull: true,
        },
        movieType: {
            type: new db.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'video/mp4'
        },
        movieLocked: {
            type: db.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        movieDescription: {
            type: new db.DataTypes.TEXT,
            allowNull: false,
        },
        movieYear: {
            type: new db.DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "movie",
        sequelize,
        timestamps: true
    }
);

export default Movie;