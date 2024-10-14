/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `ClassRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClassRoom_code_key" ON "ClassRoom"("code");
