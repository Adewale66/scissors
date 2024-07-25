import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinksTable1721849373859 implements MigrationInterface {
  name = 'LinksTable1721849373859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "origin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f6e2cbfad6d4ed0a9cb9bb8de95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "link" ("id" SERIAL NOT NULL, "domain" character varying NOT NULL, "clicks" integer NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "UQ_4f097ceae3fb8a459a01f8f8773" UNIQUE ("domain"), CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "link_origins_origin" ("linkId" integer NOT NULL, "originId" integer NOT NULL, CONSTRAINT "PK_71f2b549226ebc28a8ccc2acfaf" PRIMARY KEY ("linkId", "originId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6544ddbf158a19571ad2d8e66" ON "link_origins_origin" ("linkId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8cb9deb44d1d7d4b8f6db099a" ON "link_origins_origin" ("originId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_origins_origin" ADD CONSTRAINT "FK_f6544ddbf158a19571ad2d8e661" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_origins_origin" ADD CONSTRAINT "FK_c8cb9deb44d1d7d4b8f6db099a6" FOREIGN KEY ("originId") REFERENCES "origin"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "link_origins_origin" DROP CONSTRAINT "FK_c8cb9deb44d1d7d4b8f6db099a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_origins_origin" DROP CONSTRAINT "FK_f6544ddbf158a19571ad2d8e661"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8cb9deb44d1d7d4b8f6db099a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f6544ddbf158a19571ad2d8e66"`,
    );
    await queryRunner.query(`DROP TABLE "link_origins_origin"`);
    await queryRunner.query(`DROP TABLE "link"`);
    await queryRunner.query(`DROP TABLE "origin"`);
  }
}
