import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMetric1666577121588 implements MigrationInterface {
  name = 'addMetric1666577121588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "UQ_6409954e4613f897aa2804da59b"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "metricId"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "metricId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_6409954e4613f897aa2804da59b" UNIQUE ("metricId")');
  }
}
