import { MigrationInterface, QueryRunner } from "typeorm";

export class Dislike1776888453248 implements MigrationInterface {
    name = 'Dislike1776888453248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dislikes" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "article_id" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ea012060fc971c41668dc3f6e8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dislikes" ADD CONSTRAINT "FK_55e9d244bbfe32bdfbbc29df1ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dislikes" ADD CONSTRAINT "FK_bb5f6793c88e40affefd5e7d471" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dislikes" DROP CONSTRAINT "FK_bb5f6793c88e40affefd5e7d471"`);
        await queryRunner.query(`ALTER TABLE "dislikes" DROP CONSTRAINT "FK_55e9d244bbfe32bdfbbc29df1ee"`);
        await queryRunner.query(`DROP TABLE "dislikes"`);
    }

}
