import {MigrationInterface, QueryRunner} from "typeorm";

export class addMetric1666358051354 implements MigrationInterface {
    name = 'addMetric1666358051354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bpm" integer NOT NULL, "metric_date" date NOT NULL, "metric_hour" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "birth_date" date NOT NULL, "metricId" uuid NOT NULL, CONSTRAINT "UQ_6409954e4613f897aa2804da59b" UNIQUE ("metricId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "metric" ADD CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metric" DROP CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "metric"`);
    }

}
