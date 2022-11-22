import { Movie } from "src/models/movies/movie.entity";
import { Status } from "src/models/status/status.entity";
import { User } from "src/models/users/user.entity";

export class CreateUserMovieDto {
    movieId: Movie;
    statusId: Status;
    grade: string;
    comment: string;
}
