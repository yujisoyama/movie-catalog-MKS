import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
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
    @Get('/:id')
    @HttpCode(200)
    async getMovieById(@Param('id') movieId: number) {
        try {
            const reqMovie: Partial<Movie> = { id: movieId }
            return await this.movieService.getMovieById(reqMovie);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/filter')
    @HttpCode(200)
    async getFilterMovies(@Body() filterMovie: FilterMoviesDto) {
        try {
            return this.movieService.getMoviesByFilter(filterMovie);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
