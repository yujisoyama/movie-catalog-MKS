import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserMovieDto {
    @ApiProperty({
        description: 'Id da relação usuário filme que você deseja atualizar. O id da relação pode ser obtido através da rota /user/movies/filter com o método POST',
        example: '2'
    })
    userMovieId: number;

    @ApiPropertyOptional({
        description: 'Campo para sobrescrever a nota do filme de 0 a 10 caso queira',
        example: '8'
    }) 
    grade: string;

    @ApiPropertyOptional({
        description: 'Campo para sobrescrever o seu comentário caso queira',
        example: 'Direção péssima, etc.'
    })
    comment: string;

    @ApiProperty({
        description: 'Campo para alterar o seu tipo de relação com o filme caso queira. É possível verificar todos os tipos de relação existentes na rota /status com o método GET',
        example: '2'
    })
    statusId: number;
}