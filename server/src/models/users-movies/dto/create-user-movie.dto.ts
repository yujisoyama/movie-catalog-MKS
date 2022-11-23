import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Movie } from "src/models/movies/movie.entity";
import { Status } from "src/models/status/status.entity";

export class CreateUserMovieDto {
    @ApiProperty({
        description: 'Id do filme cujo o usuário deseja criar uma relação. O id do filme pode ser obtido através da rota /movies/filter com o método POST',
        example: '3'
    })
    movieId: Movie;

    @ApiProperty({
        description: 'Id do status que determina que tipo de relação usuário-filme será criada. É possível verificar todos os tipos de relação existentes na rota /status com o método GET. É possível adicionar relações novas para usuários e filmes através da rota /status com o método POST',
        example: '1'
    })
    statusId: Status;
    
    @ApiPropertyOptional({
        description: 'Campo caso o usuário queria atribuir uma nota ao filme de 0 a 10',
        example: '8'
    })
    grade: string;

    @ApiPropertyOptional({
        description: 'Campo caso o usuário queira adicionar um comentário/revisão sobre o filme',
        example: 'Filme muito bom. Boa direção, bons atores, etc.'
    })
    comment: string;
}
