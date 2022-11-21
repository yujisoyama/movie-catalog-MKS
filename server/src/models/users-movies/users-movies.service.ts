import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserMovie, IUserMovieBadRequestError } from './interfaces/user-movie';
import { UserMovie } from './user-movie.entity';

@Injectable()
export class UsersMoviesService {
    constructor(@InjectRepository(UserMovie) private userMovieRepository: Repository<UserMovie>) { }

    async createUserMovie(createUserMovie: ICreateUserMovie) {
        console.log(createUserMovie.movieId);
        console.log(createUserMovie.userId);
        console.log(createUserMovie.statusId);
        
    }
}
