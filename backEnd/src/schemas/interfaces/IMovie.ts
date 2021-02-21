export interface IMovie {
    id?: number;
    movieLocation: string;
    moviePicture: string;
    movieTitle: string;
    movieLocked?:boolean;
    movieYear:number;
    movieDescription: string;
    movieAvaliation?:number;
    movieType?:string;
    
    classificationId?: number;
    categoryId?: number  
    creatorId?: number;  
  }
  