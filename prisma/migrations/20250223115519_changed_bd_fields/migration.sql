/*
  Warnings:

  - You are about to drop the column `amount_pad` on the `Fees` table. All the data in the column will be lost.
  - Added the required column `amount_paid` to the `Fees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AmountPaid" AS ENUM ('BRANCH_CODE_PREFIX', 'BRANCH_CODE_SUFFIX', 'NONE');

-- CreateEnum
CREATE TYPE "BranchBlackList" AS ENUM ('HEAD_OFFICE', 'LAGOS_OFFICE', 'ABUJA_OFFICE');

-- AlterTable
ALTER TABLE "Fees" DROP COLUMN "amount_pad",
ADD COLUMN     "amount_paid" "AmountPaid" NOT NULL;

-- DropEnum
DROP TYPE "AmountPad";
