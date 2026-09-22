import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDanceLogEntity1769488563097 implements MigrationInterface {
  name = 'UpdateDanceLogEntity1769488563097';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dance_logs" DROP COLUMN "session"`);
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD "session_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD "was_omitted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD "danced_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD CONSTRAINT "FK_9544020a21407c086e02c1bfbc8" FOREIGN KEY ("session_id") REFERENCES "dance_sessions"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );

    return void 0;
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP CONSTRAINT "FK_9544020a21407c086e02c1bfbc8"`,
    );
    await queryRunner.query(`ALTER TABLE "dance_logs" DROP COLUMN "danced_at"`);
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP COLUMN "was_omitted"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP COLUMN "session_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD "session" integer NOT NULL`,
    );

    return void 0;
  }
}
