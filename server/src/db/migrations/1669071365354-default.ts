import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669071365354 implements MigrationInterface {
    name = 'default1669071365354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_149d8bac146ea70af063a84e5dd"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_4da20f03f7173c061971a1d96c0"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_1231e756efd28f0fd110e41d017"`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "movieId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "movieId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_149d8bac146ea70af063a84e5dd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_4da20f03f7173c061971a1d96c0" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_1231e756efd28f0fd110e41d017" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_1231e756efd28f0fd110e41d017"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_4da20f03f7173c061971a1d96c0"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_149d8bac146ea70af063a84e5dd"`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "movieId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "movieId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_1231e756efd28f0fd110e41d017" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_4da20f03f7173c061971a1d96c0" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_149d8bac146ea70af063a84e5dd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
