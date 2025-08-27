/*
  Warnings:

  - You are about to drop the column `latitude` on the `tournaments` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `tournaments` table. All the data in the column will be lost.
  - Added the required column `location` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tournaments" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
