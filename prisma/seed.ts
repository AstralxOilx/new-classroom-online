const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // เพิ่มข้อมูลใน Role
  await prisma.role.createMany({
    data: [
      { role_name: 'Student' },
      { role_name: 'Teacher' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน AttendanceStatus
  await prisma.attendanceStatus.createMany({
    data: [
      { status_name: 'Absent' },
      { status_name: 'Present' },
      { status_name: 'Late' },
      { status_name: 'Excused' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน Status
  await prisma.status.createMany({
    data: [
      { status_name: 'Pending' },
      { status_name: 'Active' },
      { status_name: 'Inactive' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน Subject
  await prisma.subject.createMany({
    data: [
      { subject_name: 'Thai Language' },
      { subject_name: 'English Language' },
      { subject_name: 'Chinese Language' },
      { subject_name: 'Japanese Language' },
      { subject_name: 'French Language' },
      { subject_name: 'Mathematics' },
      { subject_name: 'Physics' },
      { subject_name: 'Chemistry' },
      { subject_name: 'Biology' },
      { subject_name: 'English Literature' },
      { subject_name: 'History' },
      { subject_name: 'Geography' },
      { subject_name: 'Computer Science' },
      { subject_name: 'Economics' },
      { subject_name: 'Business Studies' },
      { subject_name: 'Psychology' },
      { subject_name: 'Sociology' },
      { subject_name: 'Philosophy' },
      { subject_name: 'Art and Design' },
      { subject_name: 'Music' },
      { subject_name: 'Physical Education' },
      { subject_name: 'Political Science' },
      { subject_name: 'Environmental Science' },
      { subject_name: 'Engineering' },
      { subject_name: 'Information Technology' },
      { subject_name: 'Other' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน SubjectType
  await prisma.subjectType.createMany({
    data: [
      { subject_type_name: 'Linguistics' },
      { subject_type_name: 'Mathematics And Science' },
      { subject_type_name: 'Social Sciences' },
      { subject_type_name: 'Arts And Design' },
      { subject_type_name: 'Occupational And Technology Studies' },
      { subject_type_name: 'Health And Physical Education' },
      { subject_type_name: 'Business And Economics' },
      { subject_type_name: 'Other' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน Colors
  await prisma.colors.createMany({
    data: [
      { color_name: 'Gray' },
      { color_name: 'Orange' },
      { color_name: 'Amber' },
      { color_name: 'Yellow' },
      { color_name: 'Lime' },
      { color_name: 'Green' },
      { color_name: 'Emerald' },
      { color_name: 'Teal' },
      { color_name: 'Cyan' },
      { color_name: 'Sky' },
      { color_name: 'Blue' },
      { color_name: 'Indigo' },
      { color_name: 'Violet' },
      { color_name: 'Purple' },
      { color_name: 'Fuchsia' },
      { color_name: 'Pink' },
      { color_name: 'Rose' },
      { color_name: 'Red' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน NotificationType
  await prisma.notificationType.createMany({
    data: [
      { type_name: 'Assignment Due' },
      { type_name: 'Submission Graded' },
      { type_name: 'Stream Started' },
      { type_name: 'Generic' },
    ],
    skipDuplicates: true,
  });

  // เพิ่มข้อมูลใน Position
  await prisma.position.createMany({
    data: [
      { position_name: 'Student' },
      { position_name: 'Class Leader' },
      { position_name: 'Deputy Class Leader' },
      { position_name: 'Teacher' },
      { position_name: 'Assistant Teacher' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Seed data added successfully!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
