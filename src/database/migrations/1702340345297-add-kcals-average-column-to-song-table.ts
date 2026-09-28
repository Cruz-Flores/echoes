import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKcalsAverageColumnToSongTable1702340345297
  implements MigrationInterface
{
  name = 'AddKcalsAverageColumnToSongTable1702340345297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "kcals_average" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "kcals_average"`);
  }
}
