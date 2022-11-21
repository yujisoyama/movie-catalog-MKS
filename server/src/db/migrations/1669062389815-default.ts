import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669062389815 implements MigrationInterface {
    name = 'default1669062389815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "year" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "year" integer NOT NULL`);
    }

}
