import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1722435367870 implements MigrationInterface {
  name = 'Init1722435367870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "ip" character varying NOT NULL, "qrcode" character varying NOT NULL, "shortUrl" character varying NOT NULL, "originalUrl" character varying NOT NULL, "clicks" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8f27cb64c3b315a25ca69692e98" UNIQUE ("key"), CONSTRAINT "UQ_00f1be861a0bf62ade06be5b7d2" UNIQUE ("ip"), CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f27cb64c3b315a25ca69692e9" ON "link" ("key") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8f27cb64c3b315a25ca69692e9"`,
    );
    await queryRunner.query(`DROP TABLE "link"`);
  }
}
