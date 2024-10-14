/*
  Warnings:

  - You are about to alter the column `class_name` on the `ClassRoom` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.
  - You are about to alter the column `description` on the `ClassRoom` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The `colors` column on the `ClassRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('gray', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'red');

-- AlterTable
ALTER TABLE "ClassRoom" ALTER COLUMN "class_name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100),
DROP COLUMN "colors",
ADD COLUMN     "colors" "Colors" NOT NULL DEFAULT 'rose';
