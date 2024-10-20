/*
  Warnings:

  - You are about to drop the column `student_id` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_student_id_fkey";

-- DropIndex
DROP INDEX "Attendance_class_id_student_id_idx";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "student_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Attendance_class_id_user_id_idx" ON "Attendance"("class_id", "user_id");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
