import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'O usuário foi criado com sucesso!' })
    @ApiResponse({ status: 400, description: 'Mensagem informando qual propriedade gerou o erro' })
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const result = await this.userService.createUser(createUserDto);
            responseForRequests(result, res);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
