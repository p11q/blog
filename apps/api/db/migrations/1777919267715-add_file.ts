import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFile1777919267715 implements MigrationInterface {
    name = 'AddFile1777919267715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "file" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "file"`);
    }

}
