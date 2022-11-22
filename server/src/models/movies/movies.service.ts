import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyStringIsEmpty } from 'src/utils/verifyStringIsEmpty';
import { Repository } from 'typeorm';
import { IAddMovie, IFilterMovies, IMovieBadRequestError, IUpdateMovie } from './interfaces/movie.interface';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) { }

    async addMovie(createMovie: IAddMovie): Promise<string | IMovieBadRequestError> {
        if (verifyStringIsEmpty(createMovie.name)) {
            return {
                message: "O seu nome não pode ser nulo.",
                property: "name"
            }
        }

        const movie = await this.movieRepository.createQueryBuilder("movie")
            .where("LOWER(movie.name) = LOWER(:name)", { name: createMovie.name })
            .getOne();

        if (movie) {
            return {
                message: "Já existe um filme adicionado com esse nome.",
                property: "name"
            }
        }

        if (verifyStringIsEmpty(createMovie.genre)) {
            return {
                message: "O gênero do filme não pode ser nulo.",
                property: "name"
            }
        }

        if (verifyStringIsEmpty(createMovie.sinopsis)) {
            return {
                message: "A sinopse do filme não pode ser nula.",
                property: "name"
            }
        }

        const date = new Date;
        const currentYear = date.getFullYear();

        if (Number(createMovie.year) < 1895 || Number(createMovie.year) > currentYear) {
            return {
                message: `Informe um ano válido (Entre 1985 e ${currentYear})`,
                property: "year"
            }
        }

        const newMovie = this.movieRepository.create({ ...createMovie });
        await this.movieRepository.save(newMovie);
        return "O filme foi adicionado com sucesso!";
    }

    async updateMovie(updateMovie: Partial<IUpdateMovie>): Promise<string | IMovieBadRequestError> {
        if (updateMovie.id === undefined) {
            return {
                message: "Informe o ID do filme que deseja atualizar.",
                property: "id"
            }
        }

        const movie = await this.movieRepository.findOneBy({ id: updateMovie.id })

        if (!movie) {
            return {
                message: "O filme não foi encontrado.",
                property: "id"
            }
        }

        const updatedMovie = this.movieRepository.create(movie);

        if (!verifyStringIsEmpty(updateMovie.name)) {
            updatedMovie.name = updateMovie.name;
        }

        if (!verifyStringIsEmpty(updateMovie.genre)) {
            updatedMovie.genre = updateMovie.genre;
        }

        if (!verifyStringIsEmpty(updateMovie.sinopsis)) {
            updatedMovie.sinopsis = updateMovie.sinopsis;
        }

        const date = new Date;
        const currentYear = date.getFullYear() + 5;

        if (Number(updateMovie.year) < 1895 || Number(updateMovie.year) > currentYear) {
            return {
                message: `Informe um ano válido (Entre 1985 e ${currentYear})`,
                property: "year"
            }
        }

        if (!verifyStringIsEmpty(updateMovie.year)) {
            updatedMovie.year = updateMovie.year;
        }

        await this.movieRepository.save(updatedMovie);
        return "As informações do filme foram atualizadas!";
    }

    async getMovieById(movie: Partial<Movie>): Promise<Movie> {
        return await this.movieRepository.findOneBy({ id: movie.id });
    }

    async getMoviesByFilter(filterMovie: Partial<IFilterMovies>): Promise<Movie[]> {
        if (verifyStringIsEmpty(filterMovie.name)) {
            filterMovie.name = "";
        }

        if (verifyStringIsEmpty(filterMovie.genre)) {
            filterMovie.genre = "";
        }

        if (verifyStringIsEmpty(filterMovie.year)) {
            filterMovie.year = "";
        }

        return await this.movieRepository.createQueryBuilder("movie")
            .where("LOWER(movie.name) like LOWER(:name)", { name: `%${filterMovie.name}%` })
            .andWhere("LOWER(movie.genre) like LOWER(:genre)", { genre: `%${filterMovie.genre}%` })
            .andWhere("LOWER(movie.year) like LOWER(:year)", { year: `%${filterMovie.year}%` })
            .orderBy("movie.name", "ASC")
            .execute()
    }
}
