import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIcon1782375436731 implements MigrationInterface {
  name = 'AddUserIcon1782375436731';

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "icon"`);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "icon" character varying`);
  }
}
