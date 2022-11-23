import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Status } from "src/models/status/status.entity";

export class GetFilterUserMovieDto {
    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar os seus filmes através do Id do Status',
        example: '2'
    })
    statusId: Status;

    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar os seus filmes através da nota que você deu a eles',
        example: '8'
    })
    grade: string;

    @ApiPropertyOptional({
        description: 'Campo de filtro para buscar os seus filmes através do comentário/revisão que você deu a eles',
        example: 'Animação boa, etc.'
    })
    comment: string;
}