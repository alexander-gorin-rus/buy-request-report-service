import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSubject1648021890380 implements MigrationInterface {
  name = 'addSubject1648021890380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "report" ADD "subject" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "subject"`);
  }
}
