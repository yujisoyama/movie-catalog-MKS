import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { responseForRequests } from 'src/utils/responseForRequests';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
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
