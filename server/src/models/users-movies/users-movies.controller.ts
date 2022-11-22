import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UsersMoviesService } from './users-movies.service';

@Controller('users/movies')
export class UsersMoviesController {
    constructor(private usersMoviesService: UsersMoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async addMovie(@Body() createUserMovieDto: CreateUserMovieDto, @Res() res: Response) {
        try {
            const result = await this.usersMoviesService.createUserMovie(createUserMovieDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
