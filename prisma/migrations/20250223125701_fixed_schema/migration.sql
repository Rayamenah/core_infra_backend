/*
  Warnings:

  - You are about to drop the column `fees_id` on the `CardProfile` table. All the data in the column will be lost.
  - You are about to drop the column `amount_paid` on the `Fees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_id]` on the table `Fees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_paid` to the `Fees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountPaid" AS ENUM ('BRANCH_CODE_PREFIX', 'BRANCH_CODE_SUFFIX', 'NONE');

-- DropForeignKey
ALTER TABLE "CardProfile" DROP CONSTRAINT "CardProfile_fees_id_fkey";

-- AlterTable
ALTER TABLE "CardProfile" DROP COLUMN "fees_id";

-- AlterTable
ALTER TABLE "Fees" DROP COLUMN "amount_paid",
ADD COLUMN     "account_paid" "AccountPaid" NOT NULL;

-- DropEnum
DROP TYPE "AmountPaid";

-- CreateIndex
CREATE UNIQUE INDEX "Fees_card_id_key" ON "Fees"("card_id");

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "CardProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
