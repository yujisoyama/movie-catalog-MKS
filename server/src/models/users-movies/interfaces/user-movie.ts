import { Movie } from "src/models/movies/movie.entity";
import { Status } from "src/models/status/status.entity";
import { User } from "src/models/users/user.entity";

export interface ICreateUserMovie {
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
    statusId: Status;
    comment: string;
    grade: string;
}

export interface IUpdateUserMovie {
    userMovieId: number;
    grade: string;
    comment: string;
    statusId: number;
}