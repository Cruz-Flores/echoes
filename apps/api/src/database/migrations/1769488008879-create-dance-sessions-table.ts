import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDanceSessionsTable1769488008879 implements MigrationInterface {
  name = 'CreateDanceSessionsTable1769488008879';

  async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(
      `CREATE TABLE "dance_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP, "target_songs_count" integer NOT NULL, CONSTRAINT "PK_f7719c83b5b02fa66f887c92adb" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`DROP TABLE "dance_sessions"`);
  }
}
