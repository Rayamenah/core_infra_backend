/*
  Warnings:

  - You are about to drop the column `account_paid` on the `Fees` table. All the data in the column will be lost.
  - Added the required column `amount_paid` to the `Fees` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Fees_card_id_key";

-- AlterTable
ALTER TABLE "Fees" DROP COLUMN "account_paid",
ADD COLUMN     "amount_paid" "AccountPaid" NOT NULL;
