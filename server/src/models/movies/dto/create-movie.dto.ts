export class CreateMovieDto {
    name: string;
    genre: string;
    year: string;
    sinopsis: string;
}

export class UpdateMovieDto extends CreateMovieDto {
    id: number;
}