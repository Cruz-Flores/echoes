import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBodyImpactColumnToSongsTable1702939870187
  implements MigrationInterface
{
  name = 'AddBodyImpactColumnToSongsTable1702939870187';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "body_impact" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ALTER COLUMN "kcals_average" DROP DEFAULT`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ALTER COLUMN "kcals_average" SET DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "body_impact"`);
  }
}
