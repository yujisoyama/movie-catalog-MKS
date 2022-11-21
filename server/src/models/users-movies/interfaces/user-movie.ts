export interface ICreateUserMovie {
    userId: number;
    movieId: number;
    statusId: number;
    grade: number;
    comment: string;
}

export interface IUserMovieBadRequestError {
    message: string;
    property: string;
}