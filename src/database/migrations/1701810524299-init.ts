import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1701810524299 implements MigrationInterface {
  name = 'Init1701810524299';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."songs_version_enum" AS ENUM('Exceed to Zero')`,
    );
    await queryRunner.query(
      `CREATE TABLE "songs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "level" integer NOT NULL, "perceivedLevel" integer NOT NULL, "version" "public"."songs_version_enum" NOT NULL, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "songs"`);
    await queryRunner.query(`DROP TYPE "public"."songs_version_enum"`);
  }
}
