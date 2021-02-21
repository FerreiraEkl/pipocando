import { IEvaluation } from "../iterfaces/IEvaluation";
import { Movie } from "./movie.model";
import { User } from "./user.model";

export class Evaluation implements IEvaluation {
    
    id?: number;
    evaluationStars: number;
    userId?: number;
    movieId?: number;

    movie: Movie;
    user: User;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
