import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { GetFilterUserMovieDto } from './dto/get-filter-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { UsersMoviesService } from './users-movies.service';

@Controller('users/movies')
export class UsersMoviesController {
    constructor(private usersMoviesService: UsersMoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async addUserMovie(@Body() createUserMovieDto: CreateUserMovieDto, @Request() req, @Res() res: Response) {
        try {
            const result = await this.usersMoviesService.createUserMovie(createUserMovieDto, req.user);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    @HttpCode(201)
    async updateUserMovie(@Body() updateUserMovie: UpdateUserMovieDto, @Res() res: Response) {
        try {
            const result = await this.usersMoviesService.updateUserMovie(updateUserMovie);
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
    async getFilterUserMovies(@Body() getFilterUserMovies: GetFilterUserMovieDto, @Request() req) {
        try {
            return await this.usersMoviesService.filterUserMovie(getFilterUserMovies, req.user);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
