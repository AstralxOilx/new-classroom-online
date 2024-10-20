-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image_url" TEXT;

-- CreateTable
CREATE TABLE "AssignmentFile" (
    "id" SERIAL NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "file_type" TEXT,
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssignmentFile_assignment_id_idx" ON "AssignmentFile"("assignment_id");

-- AddForeignKey
ALTER TABLE "AssignmentFile" ADD CONSTRAINT "AssignmentFile_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
