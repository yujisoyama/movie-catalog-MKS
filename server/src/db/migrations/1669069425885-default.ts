import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669069425885 implements MigrationInterface {
    name = 'default1669069425885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "UQ_55ce35ef8b1a1d269a36cc1c8c2" UNIQUE ("description")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "UQ_55ce35ef8b1a1d269a36cc1c8c2"`);
    }

}
