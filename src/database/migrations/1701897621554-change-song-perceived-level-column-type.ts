import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeSongPerceivedLevelColumnType1701897621554
  implements MigrationInterface
{
  name = 'ChangeSongPerceivedLevelColumnType1701897621554';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" DROP COLUMN "perceived_level"`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "perceived_level" numeric(5,2) NOT NULL`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" DROP COLUMN "perceived_level"`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "perceived_level" integer NOT NULL`,
    );
  }
}
