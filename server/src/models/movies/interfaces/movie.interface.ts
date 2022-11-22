export interface IAddMovie {
    name: string;
    genre: string;
    year: string;
    sinopsis: string;
}

export interface IMovieBadRequestError {
    message: string;
    property: string;
}

export interface IUpdateMovie extends IAddMovie {
    id: number;
}

export interface IFilterMovies extends IAddMovie { }


