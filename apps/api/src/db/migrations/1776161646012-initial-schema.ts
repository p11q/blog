import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1776161646012 implements MigrationInterface {
    name = 'InitialSchema1776161646012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "article_id" integer, "user_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "description" character varying, "tags" character varying, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_c31d0a2f38e6e99110df62ab0af" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
