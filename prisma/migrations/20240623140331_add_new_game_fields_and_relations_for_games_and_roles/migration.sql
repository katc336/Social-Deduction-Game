/*
  Warnings:

  - You are about to drop the column `gameId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "winner" TEXT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "gameId";

-- CreateTable
CREATE TABLE "Reminders" (
    "reminderId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "playerPlayerId" INTEGER,

    CONSTRAINT "Reminders_pkey" PRIMARY KEY ("reminderId")
);

-- CreateTable
CREATE TABLE "_GameToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToRole_AB_unique" ON "_GameToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToRole_B_index" ON "_GameToRole"("B");

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_playerPlayerId_fkey" FOREIGN KEY ("playerPlayerId") REFERENCES "Player"("playerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToRole" ADD CONSTRAINT "_GameToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToRole" ADD CONSTRAINT "_GameToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;
