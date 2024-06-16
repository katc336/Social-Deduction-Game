/*
  Warnings:

  - You are about to drop the column `alive` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "alive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "alive";
