import { Movie } from "src/models/movies/movie.entity";
import { Status } from "src/models/status/status.entity";
import { User } from "src/models/users/user.entity";

export class CreateUserMovieDto {
    userId: User;
    movieId: Movie;
    statusId: Status;
    grade: number;
    comment: string;
}