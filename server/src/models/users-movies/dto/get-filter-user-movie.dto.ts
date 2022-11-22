import { Status } from "src/models/status/status.entity";
import { User } from "src/models/users/user.entity";

export class GetFilterUserMovieDto {
    statusId: Status;
    grade: string;
    comment: string;
}