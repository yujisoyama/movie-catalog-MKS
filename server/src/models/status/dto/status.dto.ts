import { ApiProperty } from "@nestjs/swagger";

export class CreateStatusDto {
    @ApiProperty({
        description: 'Descrição do status que relaciona usuários com os filmes',
        example: 'Para assistir'
    })
    description: string;
}

