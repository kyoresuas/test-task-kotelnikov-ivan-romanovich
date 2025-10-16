import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760601480579 implements MigrationInterface {
    name = 'Migration1760601480579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "totalSeats" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "eventId" integer NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_161ef84a823b75f741862a77138" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_161ef84a823b75f741862a77138"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
