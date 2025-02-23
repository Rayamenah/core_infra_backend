/*
  Warnings:

  - You are about to drop the column `amount_paid` on the `Fees` table. All the data in the column will be lost.
  - Added the required column `account_paid` to the `Fees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fees" DROP COLUMN "amount_paid",
ADD COLUMN     "account_paid" "AccountPaid" NOT NULL;
