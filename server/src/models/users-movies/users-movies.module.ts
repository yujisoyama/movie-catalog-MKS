import { UsersMoviesService } from './users-movies.service';
import { UsersMoviesController } from './users-movies.controller';


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMovie } from './user-movie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserMovie])],
    controllers: [UsersMoviesController],
    providers: [UsersMoviesService],
})
export class UsersMoviesModule { }
