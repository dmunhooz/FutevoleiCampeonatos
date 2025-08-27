/*
  Warnings:

  - You are about to drop the column `user_id` on the `tournaments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tournaments" DROP CONSTRAINT "tournaments_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."tournaments" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."tournaments" ADD CONSTRAINT "tournaments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
