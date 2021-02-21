import { IClassification } from '../interfaces/IClassification';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import Movie from './movieSchema';

class Classification extends db.Model<IClassification> implements IClassification {

    id?: number;
    classificationName!: string;
    classificationPicture!: string;

    public static associations: {
        movies: db.Association<Classification, Movie>;
    };

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Classification.init(
    {
        classificationName: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        },
        classificationPicture: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "classification",
        sequelize,
        timestamps: true
    }
);

export default Classification;