import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlbums1731930850702 implements MigrationInterface {
  name = 'AddAlbums1731930850702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "year" integer NOT NULL,
        "artistId" uuid,
        PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
