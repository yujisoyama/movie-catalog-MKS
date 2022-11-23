import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @ApiProperty({
        description: 'O nome do filme',
        example: 'Harry Potter e a Pedra Filosofal'
    })
    name: string;

    @ApiProperty({
        description: 'O gênero do filme',
        example: 'Ação, Ficção, Aventura'
    })
    genre: string;

    @ApiProperty({
        description: 'O ano de lançamento do filme',
        example: '2011',
    })
    year: string;
    
    @ApiProperty({
        description: 'A sinopse do filme',
        example: 'Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts...'
    })
    sinopsis: string;
}
