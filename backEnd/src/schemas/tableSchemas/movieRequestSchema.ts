import { IMovieRequest } from '../interfaces/IMovieRequest';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import User from './userSchema';


class MovieRequest extends db.Model<IMovieRequest> implements IMovieRequest {
    id?: number;
    movieRequestName!: string;
    movieRequestYear!: number;
    movieRequestDescription!: string;
    creatorId?: number;

    public static associations: {
        creator: db.Association<MovieRequest, User>;
    };

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MovieRequest.init(
    {
        movieRequestName: {
            type: new db.DataTypes.STRING,
            allowNull: false
        },
        movieRequestYear: {
            type: new db.DataTypes.INTEGER,
            allowNull: false
        },
        movieRequestDescription: {
            type: new db.DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "movie_request",
        sequelize,
        timestamps: true
    }
);

export default MovieRequest;