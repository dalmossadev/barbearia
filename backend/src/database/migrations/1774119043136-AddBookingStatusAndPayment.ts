import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookingStatusAndPayment1774119043136 implements MigrationInterface {
    name = 'AddBookingStatusAndPayment1774119043136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "payment_intent_id" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "payment_intent_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    }

}
