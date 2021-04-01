import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1616701599163 implements MigrationInterface {
  name = "Initial1616701599163";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "telephone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "telephone" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastname" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstname" character varying NOT NULL`
    );
  }
}
