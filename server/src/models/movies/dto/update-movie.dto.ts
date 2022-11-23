import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateMovieDto {
    @ApiProperty({
        description: 'O id do filme que se deseja atualizar as informações. O id do filme pode ser obtido através da rota /movies/filter com o método POST',
        example: '2',
    })
    id: number;

    @ApiPropertyOptional({
        description: 'Irá atualizar o nome do filme com o que for inserido nesse campo caso este seja informado'
    })
    name: string;

    @ApiPropertyOptional({
        description: 'Irá atualizar o gênero do filme com o que for inserido nesse campo caso este seja informado',
    })
    genre: string;

    @ApiPropertyOptional({
        description: 'Irá atualizar o ano de lançamento do filme com o que for inserido nesse campo caso este seja informado',
        example: '2011'
    })
    year: string;
    
    @ApiProperty({
        description: 'Irá atualizar a sinopse do filme com o que for inserido nesse campo caso este seja informado'
    })
    sinopsis: string;
}