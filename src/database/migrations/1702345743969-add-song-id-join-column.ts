import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSongIdJoinColumn1702345743969 implements MigrationInterface {
  name = 'AddSongIdJoinColumn1702345743969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP CONSTRAINT "FK_388492b40fbd589d3f0e3e0c75b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" RENAME COLUMN "songId" TO "song_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD CONSTRAINT "FK_99d4d0d695c72cca81960437c57" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dance_logs" DROP CONSTRAINT "FK_99d4d0d695c72cca81960437c57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" RENAME COLUMN "song_id" TO "songId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dance_logs" ADD CONSTRAINT "FK_388492b40fbd589d3f0e3e0c75b" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
