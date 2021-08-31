import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1628246693683 implements MigrationInterface {
    name = 'CreateUser1628246693683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "emailConfirmToken" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "passwordChangedAt" TIMESTAMP NOT NULL, "passwordResetToken" character varying NOT NULL DEFAULT '', "passwordResetExpires" TIMESTAMP, "language" character(3) NOT NULL DEFAULT 'eng', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
