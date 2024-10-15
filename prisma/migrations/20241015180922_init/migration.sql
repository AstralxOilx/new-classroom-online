-- AlterTable
ALTER TABLE "ClassroomStudent" ADD COLUMN     "position_id" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Position" (
    "position_id" SERIAL NOT NULL,
    "position_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_position_name_key" ON "Position"("position_name");

-- AddForeignKey
ALTER TABLE "ClassroomStudent" ADD CONSTRAINT "ClassroomStudent_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;
