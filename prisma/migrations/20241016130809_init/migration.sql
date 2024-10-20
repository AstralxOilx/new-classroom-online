-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "attendance_score" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ClassroomStudent" ADD COLUMN     "behavior_score" DOUBLE PRECISION,
ADD COLUMN     "creativity_score" DOUBLE PRECISION,
ADD COLUMN     "effort_score" DOUBLE PRECISION,
ADD COLUMN     "exam_score" DOUBLE PRECISION,
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "participation_score" DOUBLE PRECISION;
