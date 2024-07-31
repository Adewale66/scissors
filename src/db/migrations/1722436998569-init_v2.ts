import { MigrationInterface, QueryRunner } from "typeorm";

export class InitV21722436998569 implements MigrationInterface {
    name = 'InitV21722436998569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "UQ_00f1be861a0bf62ade06be5b7d2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "UQ_00f1be861a0bf62ade06be5b7d2" UNIQUE ("ip")`);
    }

}
