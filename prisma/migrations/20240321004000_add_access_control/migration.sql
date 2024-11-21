-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('TEAM', 'PROSPECT');

-- CreateTable
CREATE TABLE "DealRoomRole" (
    "id" TEXT NOT NULL,
    "role" "AccessRole" NOT NULL DEFAULT 'VIEWER',
    "userId" TEXT NOT NULL,
    "dealRoomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DealRoomRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealRoomAccess" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dealRoomId" TEXT NOT NULL,
    "type" "AccessType" NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastAccess" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DealRoomAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DealRoomRole_userId_dealRoomId_key" ON "DealRoomRole"("userId", "dealRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "DealRoomAccess_token_key" ON "DealRoomAccess"("token");

-- CreateIndex
CREATE UNIQUE INDEX "DealRoomAccess_dealRoomId_email_key" ON "DealRoomAccess"("dealRoomId", "email");

-- AddForeignKey
ALTER TABLE "DealRoomRole" ADD CONSTRAINT "DealRoomRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealRoomRole" ADD CONSTRAINT "DealRoomRole_dealRoomId_fkey" FOREIGN KEY ("dealRoomId") REFERENCES "DealRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealRoomAccess" ADD CONSTRAINT "DealRoomAccess_dealRoomId_fkey" FOREIGN KEY ("dealRoomId") REFERENCES "DealRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;