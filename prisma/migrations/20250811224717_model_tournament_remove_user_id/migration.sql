/*
  Warnings:

  - You are about to drop the column `userId` on the `tournaments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tournaments" DROP CONSTRAINT "tournaments_userId_fkey";

-- AlterTable
ALTER TABLE "public"."tournaments" DROP COLUMN "userId";
