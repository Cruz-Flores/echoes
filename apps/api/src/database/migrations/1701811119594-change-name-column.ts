import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameColumn1701811119594 implements MigrationInterface {
  name = 'ChangeNameColumn1701811119594';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" RENAME COLUMN "perceivedLevel" TO "perceived_level"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" RENAME COLUMN "perceived_level" TO "perceivedLevel"`,
    );
  }
}
