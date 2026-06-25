import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateShemas1782187114890 implements MigrationInterface {
  name = 'UpdateShemas1782187114890';

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "uploads" DROP CONSTRAINT "FK_15e68f3a870922111e7289247ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_08b0c423c743b79856f6730020f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes_" DROP CONSTRAINT "FK_6bc90a615b86c907a6324988091"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes_" DROP CONSTRAINT "FK_1260f111c2ffda8a2c1be39209b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislikes" DROP CONSTRAINT "FK_55e9d244bbfe32bdfbbc29df1ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislikes" DROP CONSTRAINT "FK_bb5f6793c88e40affefd5e7d471"`,
    );
    await queryRunner.query(`DROP TABLE "uploads"`);
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "likes_"`);
    await queryRunner.query(`DROP TABLE "dislikes"`);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dislikes" ("article_id" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_ea012060fc971c41668dc3f6e8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "likes_" ("article_id" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_07cbcbdc83d3489fa7b0e36c758" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("expires" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "user" integer, CONSTRAINT "PK_4542dd2f38a61354a040ba9fd57" PRIMARY KEY ("token"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "text" character varying NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), "article_id" integer, "user_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "id" SERIAL NOT NULL, "tags" character varying, "text" character varying NOT NULL, "title" character varying NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "uploads" ("article_id" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "path" character varying NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislikes" ADD CONSTRAINT "FK_bb5f6793c88e40affefd5e7d471" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislikes" ADD CONSTRAINT "FK_55e9d244bbfe32bdfbbc29df1ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes_" ADD CONSTRAINT "FK_1260f111c2ffda8a2c1be39209b" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes_" ADD CONSTRAINT "FK_6bc90a615b86c907a6324988091" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_08b0c423c743b79856f6730020f" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "uploads" ADD CONSTRAINT "FK_15e68f3a870922111e7289247ea" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
