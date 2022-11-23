import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Rota para adicionar filmes na base de dados'})
    @ApiResponse({ status: 201, description: 'O filme foi adicionado com sucesso!' })
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
    @ApiOperation({ summary: 'Rota para atualizar dados de um filme presente na base de dados'})
    @ApiResponse({ status: 200, description: 'As informações do filme foram atualizadas!' })
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
    @ApiOperation({ summary: 'Rota para retornar o filme de acordo com o seu id na base'})
    @ApiResponse({ status: 200, description: 'Retorna as informações do filme' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
    @ApiOperation({ summary: 'Rota para encontrar filmes presentes na base de acordo com filtros informados'})
    @ApiResponse({ status: 200, description: 'Retorna um array de objetos com as informações dos filmes que se encaixaram no filtro informado. Caso nenhum filtro seja informado no Body, retornará todos os filmes presentes na base' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
