import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669143666983 implements MigrationInterface {
    name = 'default1669143666983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_55ce35ef8b1a1d269a36cc1c8c2" UNIQUE ("description"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_movies" ("id" SERIAL NOT NULL, "grade" character varying, "comment" character varying NOT NULL, "userId" integer NOT NULL, "movieId" integer NOT NULL, "statusId" integer NOT NULL, CONSTRAINT "PK_907a29c02ccac473d188dad7fb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "genre" character varying NOT NULL, "year" character varying NOT NULL, "sinopsis" character varying NOT NULL, CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_149d8bac146ea70af063a84e5dd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_4da20f03f7173c061971a1d96c0" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movies" ADD CONSTRAINT "FK_1231e756efd28f0fd110e41d017" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_1231e756efd28f0fd110e41d017"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_4da20f03f7173c061971a1d96c0"`);
        await queryRunner.query(`ALTER TABLE "user_movies" DROP CONSTRAINT "FK_149d8bac146ea70af063a84e5dd"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "user_movies"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
