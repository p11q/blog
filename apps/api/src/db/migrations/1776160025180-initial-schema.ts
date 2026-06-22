import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1776160025180 implements MigrationInterface {
  public down(_queryRunner: QueryRunner): Promise<void> {
    // no-op: схема создаётся в более поздней миграции
    return Promise.resolve();
  }

  public up(_queryRunner: QueryRunner): Promise<void> {
    // no-op: схема создаётся в более поздней миграции
    return Promise.resolve();
  }
}
