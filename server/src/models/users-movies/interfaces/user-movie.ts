import { Movie } from "src/models/movies/movie.entity";
import { Status } from "src/models/status/status.entity";
import { User } from "src/models/users/user.entity";

export interface ICreateUserMovie {
    userId: User;
    movieId: Movie;
    statusId: Status;
    grade: string;
    comment: string;
}

export interface IUserMovieBadRequestError {
    message: string;
    property: string;
}

export interface IFilterUserMovie {
    userId: User;
    statusId: Status;
    comment: string;
    grade: string;
    
}