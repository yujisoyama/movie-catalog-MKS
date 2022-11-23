import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterMoviesDto {
    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar filmes pelo nome',
        example: 'Harry Potter'
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar filmes pelo gênero',
        example: 'Ação'
    })
    genre?: string;

    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar filmes pelo ano de lançamento',
        example: '2011'
    })
    year?: string;
}