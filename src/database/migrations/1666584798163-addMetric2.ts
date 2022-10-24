import {MigrationInterface, QueryRunner} from "typeorm";

export class addMetric21666584798163 implements MigrationInterface {
    name = 'addMetric21666584798163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bpm" integer NOT NULL, "pa" integer NOT NULL, "metric_date" date NOT NULL, "metric_hour" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "birth_date" date NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "metric" ADD CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metric" DROP CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "metric"`);
    }

}
