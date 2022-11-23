import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário que será utilizado na sua criação',
        example: 'Fabio Soyama'
    })
    name: string;

    @ApiProperty({
        description: 'Email do usuário que será utilizado na sua criação. O email é utilizado no login do usuário',
        example: 'fabio.soyama@gmail.com'
    })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário. É utilizado para login do usuário',
        example: 'G46Hgnws32f'
    })
    password: string;
}