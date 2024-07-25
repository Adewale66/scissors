import { MigrationInterface, QueryRunner } from "typeorm";

export class LinksTableV31721916899021 implements MigrationInterface {
    name = 'LinksTableV31721916899021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "FK_f6544ddbf158a19571ad2d8e661"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6544ddbf158a19571ad2d8e66"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" RENAME COLUMN "linkId" TO "linkDomain"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" RENAME CONSTRAINT "PK_71f2b549226ebc28a8ccc2acfaf" TO "PK_df10b1fafa84f30f9eb31b8378b"`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "link" ADD "originalLink" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "PK_4f097ceae3fb8a459a01f8f8773" PRIMARY KEY ("domain")`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "UQ_4f097ceae3fb8a459a01f8f8773"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "PK_df10b1fafa84f30f9eb31b8378b"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "PK_c8cb9deb44d1d7d4b8f6db099a6" PRIMARY KEY ("originId")`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP COLUMN "linkDomain"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD "linkDomain" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "PK_c8cb9deb44d1d7d4b8f6db099a6"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "PK_df10b1fafa84f30f9eb31b8378b" PRIMARY KEY ("originId", "linkDomain")`);
        await queryRunner.query(`CREATE INDEX "IDX_c352721884e90febbfab3a4f16" ON "link_origins_origin" ("linkDomain") `);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "FK_c352721884e90febbfab3a4f164" FOREIGN KEY ("linkDomain") REFERENCES "link"("domain") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "FK_c352721884e90febbfab3a4f164"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c352721884e90febbfab3a4f16"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "PK_df10b1fafa84f30f9eb31b8378b"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "PK_c8cb9deb44d1d7d4b8f6db099a6" PRIMARY KEY ("originId")`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP COLUMN "linkDomain"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD "linkDomain" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" DROP CONSTRAINT "PK_c8cb9deb44d1d7d4b8f6db099a6"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "PK_df10b1fafa84f30f9eb31b8378b" PRIMARY KEY ("linkDomain", "originId")`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "UQ_4f097ceae3fb8a459a01f8f8773" UNIQUE ("domain")`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "PK_4f097ceae3fb8a459a01f8f8773"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "originalLink"`);
        await queryRunner.query(`ALTER TABLE "link" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" RENAME CONSTRAINT "PK_df10b1fafa84f30f9eb31b8378b" TO "PK_71f2b549226ebc28a8ccc2acfaf"`);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" RENAME COLUMN "linkDomain" TO "linkId"`);
        await queryRunner.query(`CREATE INDEX "IDX_f6544ddbf158a19571ad2d8e66" ON "link_origins_origin" ("linkId") `);
        await queryRunner.query(`ALTER TABLE "link_origins_origin" ADD CONSTRAINT "FK_f6544ddbf158a19571ad2d8e661" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
