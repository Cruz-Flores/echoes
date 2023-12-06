import { MigrationInterface, QueryRunner } from 'typeorm';

export class DanceLogEntity1701893587070 implements MigrationInterface {
  name = 'DanceLogEntity1701893587070';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dance_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kcal" numeric(5,2) NOT NULL, "session" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "songId" uuid NOT NULL, CONSTRAINT "PK_4c89b16ddac6de792b7e08bb2b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD CONSTRAINT "FK_388492b40fbd589d3f0e3e0c75b" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP CONSTRAINT "FK_388492b40fbd589d3f0e3e0c75b"`,
    );
    await queryRunner.query(`DROP TABLE "dance_logs"`);
  }
}
