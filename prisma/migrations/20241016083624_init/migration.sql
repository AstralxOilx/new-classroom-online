/*
  Warnings:

  - You are about to drop the column `sender_id` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_sender_id_fkey";

-- DropIndex
DROP INDEX "ChatMessage_class_id_sender_id_idx";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "sender_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ChatMessage_class_id_user_id_idx" ON "ChatMessage"("class_id", "user_id");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
