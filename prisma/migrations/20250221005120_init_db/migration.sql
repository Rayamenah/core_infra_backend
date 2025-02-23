-- CreateEnum
CREATE TYPE "CardScheme" AS ENUM ('VISA', 'MASTERCARD');

-- CreateEnum
CREATE TYPE "FeeFrequency" AS ENUM ('MONTHLY', 'ONE_OFF');

-- CreateEnum
CREATE TYPE "FeeImpact" AS ENUM ('ISSUANCE', 'FEE_REISSUE');

-- CreateEnum
CREATE TYPE "AmountPad" AS ENUM ('BRANCH_CODE_PREFIX', 'BRANCH_CODE_SUFFIX', 'NONE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'READY', 'ACKNOWLEDGED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CLASSIC_DEBIT', 'CLASSIC_CREDIT');

-- CreateTable
CREATE TABLE "CardRequest" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "branch_name" TEXT NOT NULL,
    "initiator" TEXT NOT NULL,
    "card_type" "CardType" NOT NULL,
    "card_charges" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "batch" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL,

    CONSTRAINT "CardRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardProfile" (
    "id" TEXT NOT NULL,
    "fees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "card_name" TEXT NOT NULL,
    "bin_prefix" TEXT NOT NULL,
    "card_scheme" "CardScheme" NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "branch_blacklist" TEXT[],

    CONSTRAINT "CardProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fees" (
    "id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "fee_frequency" "FeeFrequency" NOT NULL,
    "fee_impact" "FeeImpact" NOT NULL,
    "amount_pad" "AmountPad" NOT NULL,
    "account" INTEGER NOT NULL,

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardProfile" ADD CONSTRAINT "CardProfile_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "Fees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
