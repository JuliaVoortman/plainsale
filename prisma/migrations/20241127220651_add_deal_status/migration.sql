-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('ACTIVE', 'CLOSED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "DealRoom" ADD COLUMN     "status" "DealStatus" NOT NULL DEFAULT 'ACTIVE';
