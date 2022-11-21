import { BadRequestException, Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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

            if (typeof result === 'string') {
                return res.json({ message: result });
            }

            return res.status(HttpStatus.BAD_REQUEST).json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
