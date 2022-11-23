import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    @ApiOperation({summary: 'Rota para login e geração de token de acesso do usuário'})
    @ApiResponse({ status: 201, description: 'access_token' })
    @ApiResponse({ status: 401, description: 'As credenciais são inválidas' })
    login(@Body() loginUserDto: LoginUserDto, @Request() req: any) {
        return this.authService.login(req.user);
    }
}
