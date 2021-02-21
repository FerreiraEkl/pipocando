import { IUser } from '../iterfaces/IUser';
import { Evaluation } from './evaluation.model';
import { MailConfirm } from './mailConfirm';
import { Movie } from './movie.model';
import { MovieRequest } from './movieRequest.model';
import { Signature } from './signature.model';
export class User implements IUser {

  constructor() {
    this.requests = new Array<MovieRequest>();
    this.createdMovies = new Array<Movie>();
    this.evaluations = new Array<Evaluation>();
  }

  id?: number;
  userLogin: string;
  userPassword: string;
  userAdultPassword?: string;
  userFirstName: string;
  userLastName?: string;
  userValid?: boolean;
  userMail: string;
  userProfile?: number;

  requests: Array<MovieRequest>;
  signature: Signature;
  createdMovies: Array<Movie>;
  evaluations: Array<Evaluation>;
  mailConfirmation: MailConfirm;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
