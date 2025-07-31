import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntityRelations1753982704838 implements MigrationInterface {
  name = 'UpdateEntityRelations1753982704838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "operator" TO "isOperator"`
    );
    await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "room"`);
    await queryRunner.query(`ALTER TABLE "conversation" ADD "roomId" integer`);
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "conversationId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isOperator" SET DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ALTER COLUMN "userId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD CONSTRAINT "FK_c308b1cd542522bb66430fa860a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD CONSTRAINT "FK_c3eb45de493217a6d0e225028fa" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD CONSTRAINT "FK_308ba56d88a90fe50ea0f14b40f" FOREIGN KEY ("workerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "conversation" DROP CONSTRAINT "FK_308ba56d88a90fe50ea0f14b40f"`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" DROP CONSTRAINT "FK_c3eb45de493217a6d0e225028fa"`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" DROP CONSTRAINT "FK_c308b1cd542522bb66430fa860a"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ALTER COLUMN "userId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isOperator" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "conversationId" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "roomId"`);
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD "room" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "isOperator" TO "operator"`
    );
  }
}
