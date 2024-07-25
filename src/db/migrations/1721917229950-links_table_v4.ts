import { MigrationInterface, QueryRunner } from "typeorm";

export class LinksTableV41721917229950 implements MigrationInterface {
    name = 'LinksTableV41721917229950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" RENAME COLUMN "originalLink" TO "originalUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" RENAME COLUMN "originalUrl" TO "originalLink"`);
    }

}
