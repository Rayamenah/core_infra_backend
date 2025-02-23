/*
  Warnings:

  - Changed the type of `branch_blacklist` on the `CardProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CardProfile" DROP COLUMN "branch_blacklist",
ADD COLUMN     "branch_blacklist" "BranchBlackList" NOT NULL;
