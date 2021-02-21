import { IMovie } from '../iterfaces/IMovie';
import { Category } from './category.model';
import { Classification } from './classification.model';
import { Evaluation } from './evaluation.model';
import { User } from './user.model';
export class Movie implements IMovie {

    constructor() {
        this.evaluations = new Array<Evaluation>();
    }

    id?: number;
    movieLocation: string;
    moviePicture: string;
    movieTitle: string;
    movieLocked?: boolean;
    movieYear: number;
    movieDescription: string;
    movieAvaliation?: number;
    movieType?: string;
    classificationId?: number;
    categoryId?: number;
    creatorId?: number;

    creator: User;
    category: Category;
    classification: Classification;
    evaluations: Array<Evaluation>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
