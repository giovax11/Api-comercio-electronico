/*
  Warnings:

  - You are about to drop the column `state` on the `order` table. All the data in the column will be lost.
  - Added the required column `status` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "state",
ADD COLUMN     "status" VARCHAR(20) NOT NULL;
