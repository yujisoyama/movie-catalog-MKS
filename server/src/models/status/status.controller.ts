
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStatusDto } from './dto/status.dto';
import { StatusService } from './status.service';

@ApiBearerAuth()
@ApiTags('status')
@Controller('status')
export class StatusController {
    constructor(private statusServices: StatusService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Rota para adicionar tipos de relação usuário-filme na base de dados'})
    @ApiResponse({ status: 201, description: 'Relação adicionada com sucesso!' })
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
    @HttpCode(201)
    async createStatus(@Body() createStatusDto: CreateStatusDto, @Res() res: Response) {
        try {
            const result = await this.statusServices.createStatus(createStatusDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Rota para obter todos os tipos de relação usuário-filme presentes na base'})
    @ApiResponse({ status: 200, description: 'Retorna todos os tipos de relação usuário-filme disponíveis na base' })
    @ApiResponse({ status: 401, description: 'Token informado para a requisição é inválido' })
    @HttpCode(200)
    async getAllStatus() {
        try {
            return await this.statusServices.getAllStatus();
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
