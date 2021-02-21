import { ICategory } from '../interfaces/ICategory';
import * as db from '../../config/configSequelize';
import { sequelize } from '../../config/configSequelize'
import Movie from './movieSchema';

class Category extends db.Model<ICategory> implements ICategory {
    id?: number;
    categoryName!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {
        movies: db.Association<Category, Movie>;
    };
}

Category.init(
    {
        categoryName: {
            type: new db.DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "category",
        sequelize,
        timestamps: true
    }
);

export default Category;