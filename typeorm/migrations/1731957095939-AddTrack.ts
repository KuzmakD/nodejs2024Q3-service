import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrack1731957095939 implements MigrationInterface {
  name = 'AddTrack1731957095939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "artistId" uuid,
        "albumId" uuid,
        "duration" integer NOT NULL,
        PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
