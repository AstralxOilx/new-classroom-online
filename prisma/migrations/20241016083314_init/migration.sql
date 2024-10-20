/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `ClassRoom` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `ClassroomStudent` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ClassRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ClassroomStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassRoom" DROP CONSTRAINT "ClassRoom_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassroomStudent" DROP CONSTRAINT "ClassroomStudent_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_student_id_fkey";

-- DropIndex
DROP INDEX "Assignment_class_id_teacher_id_idx";

-- DropIndex
DROP INDEX "ClassroomStudent_class_id_student_id_idx";

-- DropIndex
DROP INDEX "Stream_class_id_teacher_id_idx";

-- DropIndex
DROP INDEX "Submission_assignment_id_student_id_idx";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ClassRoom" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ClassroomStudent" DROP COLUMN "student_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "student_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Assignment_class_id_user_id_idx" ON "Assignment"("class_id", "user_id");

-- CreateIndex
CREATE INDEX "ClassroomStudent_class_id_user_id_idx" ON "ClassroomStudent"("class_id", "user_id");

-- CreateIndex
CREATE INDEX "Stream_class_id_user_id_idx" ON "Stream"("class_id", "user_id");

-- CreateIndex
CREATE INDEX "Submission_assignment_id_user_id_idx" ON "Submission"("assignment_id", "user_id");

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomStudent" ADD CONSTRAINT "ClassroomStudent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
