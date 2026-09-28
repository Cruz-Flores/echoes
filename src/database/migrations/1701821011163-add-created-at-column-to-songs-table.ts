import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtColumnToSongsTable1701821011163
  implements MigrationInterface
{
  name = 'AddCreatedAtColumnToSongsTable1701821011163';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "created_at"`);
  }
}
