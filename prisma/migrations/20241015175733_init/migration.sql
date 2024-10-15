-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "last_login" TIMESTAMPTZ,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "ClassRoom" (
    "class_id" SERIAL NOT NULL,
    "class_name" VARCHAR(30) NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "code" TEXT NOT NULL,
    "color_id" INTEGER NOT NULL DEFAULT 1,
    "subject_id" INTEGER NOT NULL DEFAULT 1,
    "subject_type_id" INTEGER NOT NULL DEFAULT 1,
    "permission_id" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "ClassroomStudent" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL DEFAULT 1,
    "joined_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassroomStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignment_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3),
    "max_score" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "submission_id" SERIAL NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "submitted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "SubmissionFile" (
    "id" SERIAL NOT NULL,
    "submission_id" INTEGER NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "stream_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "stream_url" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("stream_id")
);

-- CreateTable
CREATE TABLE "StreamAttendance" (
    "id" SERIAL NOT NULL,
    "stream_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMPTZ,

    CONSTRAINT "StreamAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "message_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "sent_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "type_id" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_id" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "AttendanceStatus" (
    "status_id" SERIAL NOT NULL,
    "status_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "AttendanceStatus_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_id" SERIAL NOT NULL,
    "status_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "SubjectType" (
    "subject_type_id" SERIAL NOT NULL,
    "subject_type_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "SubjectType_pkey" PRIMARY KEY ("subject_type_id")
);

-- CreateTable
CREATE TABLE "Colors" (
    "color_id" SERIAL NOT NULL,
    "color_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "type_id" SERIAL NOT NULL,
    "type_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_name_key" ON "Users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClassRoom_code_key" ON "ClassRoom"("code");

-- CreateIndex
CREATE INDEX "ClassroomStudent_class_id_student_id_idx" ON "ClassroomStudent"("class_id", "student_id");

-- CreateIndex
CREATE INDEX "Assignment_class_id_teacher_id_idx" ON "Assignment"("class_id", "teacher_id");

-- CreateIndex
CREATE INDEX "Submission_assignment_id_student_id_idx" ON "Submission"("assignment_id", "student_id");

-- CreateIndex
CREATE INDEX "Stream_class_id_teacher_id_idx" ON "Stream"("class_id", "teacher_id");

-- CreateIndex
CREATE INDEX "StreamAttendance_stream_id_user_id_idx" ON "StreamAttendance"("stream_id", "user_id");

-- CreateIndex
CREATE INDEX "ChatMessage_class_id_sender_id_idx" ON "ChatMessage"("class_id", "sender_id");

-- CreateIndex
CREATE INDEX "Notification_user_id_idx" ON "Notification"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE INDEX "Attendance_class_id_student_id_idx" ON "Attendance"("class_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceStatus_status_name_key" ON "AttendanceStatus"("status_name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_name_key" ON "Status"("status_name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_name_key" ON "Subject"("subject_name");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectType_subject_type_name_key" ON "SubjectType"("subject_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "Colors_color_name_key" ON "Colors"("color_name");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationType_type_name_key" ON "NotificationType"("type_name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Colors"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_subject_type_id_fkey" FOREIGN KEY ("subject_type_id") REFERENCES "SubjectType"("subject_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomStudent" ADD CONSTRAINT "ClassroomStudent_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassRoom"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomStudent" ADD CONSTRAINT "ClassroomStudent_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomStudent" ADD CONSTRAINT "ClassroomStudent_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassRoom"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionFile" ADD CONSTRAINT "SubmissionFile_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("submission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassRoom"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamAttendance" ADD CONSTRAINT "StreamAttendance_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream"("stream_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamAttendance" ADD CONSTRAINT "StreamAttendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassRoom"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "NotificationType"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassRoom"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "AttendanceStatus"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;
