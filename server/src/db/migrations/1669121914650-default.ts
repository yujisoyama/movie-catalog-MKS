import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669121914650 implements MigrationInterface {
    name = 'default1669121914650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movies" DROP COLUMN "grade"`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD "grade" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movies" DROP COLUMN "grade"`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD "grade" double precision`);
    }

}
