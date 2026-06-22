import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1782000000000 implements MigrationInterface {
  name = 'InitSchema1782000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'user',
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "articles" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "text" character varying NOT NULL,
        "description" character varying,
        "tags" character varying,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" integer,
        CONSTRAINT "PK_articles" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "comment" (
        "id" SERIAL NOT NULL,
        "text" character varying NOT NULL,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        "article_id" integer,
        "user_id" integer,
        CONSTRAINT "PK_comment" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "refresh_token" (
        "token" character varying NOT NULL,
        "expires" TIMESTAMP NOT NULL,
        "user" integer,
        CONSTRAINT "PK_refresh_token" PRIMARY KEY ("token")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "like" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "article_id" integer NOT NULL,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_like" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "dislike" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "article_id" integer NOT NULL,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_dislike" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "upload" (
        "id" SERIAL NOT NULL,
        "path" character varying NOT NULL,
        "article_id" integer NOT NULL,
        "create_at" TIMESTAMP NOT NULL DEFAULT now(),
        "update_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_upload" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "articles" ADD CONSTRAINT "FK_articles_user"
        FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "comment" ADD CONSTRAINT "FK_comment_article"
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "comment" ADD CONSTRAINT "FK_comment_user"
        FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_refresh_token_user"
        FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "like" ADD CONSTRAINT "FK_like_user"
        FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "like" ADD CONSTRAINT "FK_like_article"
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "dislike" ADD CONSTRAINT "FK_dislike_user"
        FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "dislike" ADD CONSTRAINT "FK_dislike_article"
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "upload" ADD CONSTRAINT "FK_upload_article"
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "upload" DROP CONSTRAINT "FK_upload_article"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislike" DROP CONSTRAINT "FK_dislike_article"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dislike" DROP CONSTRAINT "FK_dislike_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_like_article"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_like_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_refresh_token_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_comment_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_comment_article"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_articles_user"`,
    );

    await queryRunner.query(`DROP TABLE "upload"`);
    await queryRunner.query(`DROP TABLE "dislike"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
