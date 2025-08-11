/*
  Warnings:

  - You are about to drop the column `user_id` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `player1_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropIndex
DROP INDEX "public"."subscriptions_user_id_idx";

-- AlterTable
ALTER TABLE "public"."subscriptions" DROP COLUMN "user_id",
ADD COLUMN     "player1_id" TEXT NOT NULL,
ADD COLUMN     "player2_id" TEXT;

-- CreateIndex
CREATE INDEX "subscriptions_player1_id_idx" ON "public"."subscriptions"("player1_id");

-- CreateIndex
CREATE INDEX "subscriptions_player2_id_idx" ON "public"."subscriptions"("player2_id");

-- AddForeignKey
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
