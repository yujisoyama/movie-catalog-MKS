import { UsersMoviesService } from './users-movies.service';
import { UsersMoviesController } from './users-movies.controller';


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMovie } from './user-movie.entity';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { StatusModule } from '../status/status.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserMovie]),
        UsersModule,
        MoviesModule,
        StatusModule,
    ],
    controllers: [UsersMoviesController],
    providers: [UsersMoviesService],
})
export class UsersMoviesModule { }
