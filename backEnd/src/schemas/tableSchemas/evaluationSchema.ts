import { IEvaluation } from '../interfaces/IEvaluation';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import Movie from './movieSchema';
import User from './userSchema';

class Evaluation extends db.Model<IEvaluation> implements IEvaluation {
    id?: number ;
    evaluationStars!: number;
    userId?: number;
    movieId?: number;

    public static associations: {
        movie: db.Association<Evaluation, Movie>;
        user: db.Association<Evaluation, User>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Evaluation.init(
    {
        evaluationStars: {
            type: new db.DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        tableName: "evaluation",
        sequelize,
        timestamps:true
    }
);

export default Evaluation;