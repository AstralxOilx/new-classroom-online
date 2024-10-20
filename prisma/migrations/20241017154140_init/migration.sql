/*
  Warnings:

  - You are about to drop the column `student_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "student_id",
DROP COLUMN "teacher_id",
ADD COLUMN     "identification" TEXT;
