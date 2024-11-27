/*
  Warnings:

  - You are about to drop the column `status` on the `DealRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DealRoom" DROP COLUMN "status";

-- DropEnum
DROP TYPE "DealStatus";
