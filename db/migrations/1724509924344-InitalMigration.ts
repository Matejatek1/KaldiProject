import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitalMigration1724509924344 implements MigrationInterface {
  name = 'InitalMigration1724509924344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "userName" character varying NOT NULL, "room" integer NOT NULL, "workerId" integer, "status" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "conversationId" integer NOT NULL, "senderId" integer NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_535c742a3606d2e3122f441b26c" UNIQUE ("name"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "operator" boolean NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO public."user" VALUES (2, 'TestUser1', 'passw3', false)`
    );
    await queryRunner.query(
      `INSERT INTO public."user" VALUES (4, 'TestUser2', 'passw4', false)`
    );
    await queryRunner.query(
      `INSERT INTO public."user" VALUES (5, 'TestUser3', 'passw5', false)`
    );
    await queryRunner.query(
      `INSERT INTO public."user" VALUES (1, 'TestAdmin1', 'passw6', true)`
    );
    await queryRunner.query(
      `INSERT INTO public."user" VALUES (3, 'TestAdmin2', 'passw7', true)`
    );
    await queryRunner.query(`INSERT INTO public.room VALUES (1, 'tehnika')`);
    await queryRunner.query(`INSERT INTO public.room VALUES (3, 'pogovor')`);
    await queryRunner.query(`INSERT INTO public.room VALUES (2, 'storitve')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "conversation"`);
  }
}
