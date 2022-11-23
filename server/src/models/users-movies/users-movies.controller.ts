import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { GetFilterUserMovieDto } from './dto/get-filter-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { UsersMoviesService } from './users-movies.service';

@ApiBearerAuth()
@ApiTags('user_movies')
@Controller('users/movies')
export class UsersMoviesController {
    constructor(private usersMoviesService: UsersMoviesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Rota para criar relação usuário-filme. O usuário atrelado nessa operação é obtido através do token necessário para o consumo desta rota'})
    @ApiResponse({ status: 201, description: "A relação do usuário 'Nome do usuário' com o filme 'Nome do filme' foi adicionada. Status: 'Tipo de relação'; Nota: 'Nota informada'; Comentário: 'Comentário informado' "})
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
    @ApiOperation({ summary: 'Rota para editar uma relação usuário-filme existente. O usuário atrelado nessa operação é obtido através do token necessário para o consumo desta rota'})
    @ApiResponse({ status: 201, description: "Sua relação com o filme foi atualizada. Status: 'Relação informada'; Nota: 'Nota informada'; Comentário: 'Comentário informado'"})
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @HttpCode(201)
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
    @ApiOperation({ summary: 'Rota para remover uma relação usuário-filme'})
    @ApiResponse({ status: 201, description: "A relação do usuário 'Nome do usuário' e o filme 'Nome do filme' foi removida."})
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
    @HttpCode(200)
    async removeUserMovie(@Param('id') id: number, @Res() res: Response) {
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
    @ApiOperation({ summary: 'Rota para obter as relações usuário-filme existentes para o usuário da requisição. Este usuário é obtido através do token necessário para o consumo desta rota'})
    @ApiResponse({ status: 201, description: 'Retorna um array de objetos com as informações da relação usuário-filme que se encaixaram no filtro informado. Caso nenhum filtro seja informado no Body, retornará todas as relações do usuário presentes na base'})
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
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
