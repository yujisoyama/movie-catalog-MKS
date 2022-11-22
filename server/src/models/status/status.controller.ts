
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStatusDto } from './dto/status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private statusServices: StatusService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
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
