import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'access_token' })
    @ApiResponse({ status: 401, description: 'As credenciais são inválidas' })
    login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
