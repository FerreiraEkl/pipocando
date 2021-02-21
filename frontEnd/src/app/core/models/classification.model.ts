import { IClassification } from '../iterfaces/IClassification';
import { Movie } from './movie.model';
export class Classification implements IClassification {

    constructor() {
        this.movies = new Array<Movie>();
    }

    id?: number;
    classificationName: string;
    classificationPicture: string;

    movies: Array<Movie>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
