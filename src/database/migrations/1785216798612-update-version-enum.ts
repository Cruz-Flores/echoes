import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVersionEnum1785216798612 implements MigrationInterface {
  name = 'UpdateVersionEnum1785216798612';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."songs_version_enum" RENAME TO "songs_version_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."songs_version_enum" AS ENUM('1st to Perfect Collection', 'Extra to Prex 3', 'Exceed to Zero', 'NX to NX Absolute', 'Fiesta to Fiesta 2', 'Prime', 'Prime 2', 'XX', 'Pro to Pro 2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ALTER COLUMN "version" TYPE "public"."songs_version_enum" USING "version"::"text"::"public"."songs_version_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."songs_version_enum_old"`);

    return void 0;
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."songs_version_enum_old" AS ENUM('Exceed to Zero')`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ALTER COLUMN "version" TYPE "public"."songs_version_enum_old" USING "version"::"text"::"public"."songs_version_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."songs_version_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."songs_version_enum_old" RENAME TO "songs_version_enum"`,
    );

    return void 0;
  }
}
