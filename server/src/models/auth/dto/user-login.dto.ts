import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        description: 'Email do usuário cadastrado',
        example: 'fabio.soyama@gmail.com'
    })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário cadastrado',
        example: 'G46Hgnws32f'
    })
    password: string;
}