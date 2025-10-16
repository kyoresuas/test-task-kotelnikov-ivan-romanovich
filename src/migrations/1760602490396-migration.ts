import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760602490396 implements MigrationInterface {
  name = "Migration1760602490396";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_161ef84a823b75f741862a77138"`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "PK_49171efc69702ed84c812f33540"`
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "eventId"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "eventId" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614"`
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_161ef84a823b75f741862a77138" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_161ef84a823b75f741862a77138"`
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614"`
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "eventId"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "eventId" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "PK_49171efc69702ed84c812f33540"`
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_161ef84a823b75f741862a77138" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
