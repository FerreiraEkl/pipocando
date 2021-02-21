import { IMovieRequest } from "../iterfaces/IMovieRequest";
import { User } from "./user.model";

export class MovieRequest implements IMovieRequest{
  id?: number;
  movieRequestName: string;
  movieRequestYear: number;
  movieRequestDescription: string;
  creatorId?: number;

  creator:User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
