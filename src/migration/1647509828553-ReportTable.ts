import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportTable1647509828553 implements MigrationInterface {
  name = 'ReportTable1647509828553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityId" character varying NOT NULL, "userId" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "report"`);
  }
}
