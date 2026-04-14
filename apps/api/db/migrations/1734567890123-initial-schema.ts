import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1734567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Последовательности
    await queryRunner.query(`
      CREATE SEQUENCE IF NOT EXISTS public.articles_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
      CREATE SEQUENCE IF NOT EXISTS public.comments_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
      CREATE SEQUENCE IF NOT EXISTS public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    `);

    // 2. Таблицы
    await queryRunner.query(`
      CREATE TABLE public.articles (
        id integer NOT NULL,
        title character varying NOT NULL,
        text character varying NOT NULL,
        description character varying,
        tags character varying,
        create_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        user_id integer
      );
    `);
    await queryRunner.query(`
      CREATE TABLE public.comments (
        id integer NOT NULL,
        text character varying NOT NULL,
        create_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        article_id integer,
        user_id integer
      );
    `);
    await queryRunner.query(`
      CREATE TABLE public.refresh_token (
        token character varying NOT NULL,
        expires timestamp without time zone NOT NULL,
        user_id integer
      );
    `);
    await queryRunner.query(`
      CREATE TABLE public.users (
        id integer NOT NULL,
        name character varying NOT NULL,
        email character varying NOT NULL,
        password character varying NOT NULL,
        role character varying DEFAULT 'user'::character varying NOT NULL,
        create_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL
      );
    `);

    // 3. Привязка последовательностей
    await queryRunner.query(`
      ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;
      ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
      ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
    `);

    // 4. Значения по умолчанию для id (автоинкремент)
    await queryRunner.query(`
      ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);
      ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
      ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
    `);

    // 5. Первичные ключи
    await queryRunner.query(`
      ALTER TABLE ONLY public.articles ADD CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY (id);
      ALTER TABLE ONLY public.comments ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY (id);
      ALTER TABLE ONLY public.users ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
      ALTER TABLE ONLY public.refresh_token ADD CONSTRAINT "PK_c31d0a2f38e6e99110df62ab0af" PRIMARY KEY (token);
    `);

    // 6. Внешние ключи
    await queryRunner.query(`
      ALTER TABLE ONLY public.comments ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY (user_id) REFERENCES public.users(id);
      ALTER TABLE ONLY public.refresh_token ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY (user_id) REFERENCES public.users(id);
      ALTER TABLE ONLY public.articles ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY (user_id) REFERENCES public.users(id);
      ALTER TABLE ONLY public.comments ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY (article_id) REFERENCES public.articles(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем внешние ключи (в обратном порядке)
    await queryRunner.query(
      `ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.articles DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.refresh_token DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    );

    // Удаляем первичные ключи
    await queryRunner.query(
      `ALTER TABLE ONLY public.refresh_token DROP CONSTRAINT "PK_c31d0a2f38e6e99110df62ab0af"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.comments DROP CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.articles DROP CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334"`,
    );

    // Удаляем таблицы
    await queryRunner.query(`DROP TABLE public.refresh_token`);
    await queryRunner.query(`DROP TABLE public.comments`);
    await queryRunner.query(`DROP TABLE public.articles`);
    await queryRunner.query(`DROP TABLE public.users`);

    // Удаляем последовательности
    await queryRunner.query(`DROP SEQUENCE public.users_id_seq`);
    await queryRunner.query(`DROP SEQUENCE public.comments_id_seq`);
    await queryRunner.query(`DROP SEQUENCE public.articles_id_seq`);
  }
}
