import { ICategory } from '../iterfaces/ICategory';
import { Movie } from './movie.model';
export class Category implements ICategory {

    constructor() {
        this.movies = new Array<Movie>();
    }

    id?: number;
    categoryName: string;

    movies: Array<Movie>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
