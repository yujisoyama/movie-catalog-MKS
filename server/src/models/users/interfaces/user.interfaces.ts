export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserError {
    message: string;
    property: string;
}