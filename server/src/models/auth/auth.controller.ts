import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Request() req): any {
        return req.user;
    }
}
