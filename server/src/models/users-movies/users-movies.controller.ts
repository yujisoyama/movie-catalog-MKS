import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserMovieDto, GetFilterUserMovieDto } from './dto/create-user-movie.dto';
import { UsersMoviesService } from './users-movies.service';

@Controller('users/movies')
export class UsersMoviesController {
    constructor(private usersMoviesService: UsersMoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async addUserMovie(@Body() createUserMovieDto: CreateUserMovieDto, @Res() res: Response) {
        try {
            const result = await this.usersMoviesService.createUserMovie(createUserMovieDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/remove/:id')
    @HttpCode(200)
    async removeUserMovie(@Param('id') id, @Res() res: Response) {
        try {
            const result = await this.usersMoviesService.removeUserMovie(id);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/filter')
    @HttpCode(200)
    async getFilterUserMovies(@Body() getFilterUserMovies: GetFilterUserMovieDto) {
        try {
            return await this.usersMoviesService.filterUserMovie(getFilterUserMovies);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
