export interface IAddMovie {
    name: string;
    genre: string;
    year: string;
    sinopsis: string;
}

export interface IBadRequestError {
    message: string;
    property: string;
}

export interface IUpdateMovie extends IAddMovie {
    id: number;
}


