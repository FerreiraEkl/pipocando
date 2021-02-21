export interface IMovieRequest {
    id?: number;
    movieRequestName: string;
    movieRequestYear: number;
    movieRequestDescription: string;

    creatorId?: number;
}