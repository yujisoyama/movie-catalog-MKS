import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMovieDto, UpdateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async addMovie(@Body() createMovieDto: CreateMovieDto, @Res() res: Response) {
        try {
            const result = await this.movieService.addMovie(createMovieDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    @HttpCode(200)
    async updateMovie(@Body() updateMovieDto: UpdateMovieDto, @Res() res: Response) {
        try {
            const result = await this.movieService.updateMovie(updateMovieDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/remove/:id')
    @HttpCode(200)
    async deleteMovie(@Param('id') id, @Res() res: Response) {
        try {
            const result = await this.movieService.removeMovie(id);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
