import { db } from '@/lib/db';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource'); // ดึงค่าจาก query parameter 'table'
    const userID = searchParams.get('user_id');
    const classID = searchParams.get('class_id');
    const userIDInt = userID ? parseInt(userID) : 0;
    const classIDInt = classID ? parseInt(classID) : 0;

    try {
        let data;

        switch (resource) {
            case 'roles':
                data = await db.role.findMany(); // ดึงข้อมูลจาก Role
                break;
            case 'attendanceStatuses':
                data = await db.attendanceStatus.findMany(); // ดึงข้อมูลจาก AttendanceStatus
                break;
            case 'statuses':
                data = await db.status.findMany(); // ดึงข้อมูลจาก Status
                break;
            case 'subjects':
                data = await db.subject.findMany(); // ดึงข้อมูลจาก Subject
                break;
            case 'subjectTypes':
                data = await db.subjectType.findMany(); // ดึงข้อมูลจาก SubjectType
                break;
            case 'colors':
                data = await db.colors.findMany(); // ดึงข้อมูลจาก Colors
                break;
            case 'notificationTypes':
                data = await db.notificationType.findMany(); // ดึงข้อมูลจาก NotificationType
                break;
            case 'positions':
                data = await db.position.findMany(); // ดึงข้อมูลจาก Position
                break;
            case 'teacher_classroom':
                const teacherWithClassrooms = await db.users.findUnique({
                    where: { user_id: userIDInt },
                    include: {
                        classrooms: {
                            include: {
                                students: {
                                    include: {
                                        student: true,
                                        status: true,
                                        position: true,
                                    },
                                },
                                subject: true,
                                subject_type: true,
                                color: true,
                                permission: true,
                                teacher: true,
                            },
                        },
                    },
                });

                // ตรวจสอบว่า userWithClassrooms เป็น null หรือไม่
                if (!teacherWithClassrooms) {
                    console.error('User not found');
                    return; // หรือ throw new Error('User not found');
                }

                // สร้างอ็อบเจ็กต์รวมข้อมูล
                data = {
                    classrooms: teacherWithClassrooms.classrooms.map(classroom => {
                        // นับจำนวนนักเรียนที่มี status_id = 2
                        const countStatus2 = classroom.students.filter(
                            studentData => studentData.status.status_id === 2
                        ).length;

                        return {
                            class_id: classroom.class_id,
                            class_name: classroom.class_name,
                            description: classroom.description,
                            subject_id: classroom.subject.subject_id,
                            subject_name: classroom.subject.subject_name,
                            subject_type_id: classroom.subject_type.subject_type_id,
                            subject_type_name: classroom.subject_type.subject_type_name,
                            color_id: classroom.color.color_id,
                            color_name: classroom.color.color_name,
                            teacher_id: classroom.teacher.user_id,
                            teacher_name: classroom.teacher.user_name,
                            user_name: teacherWithClassrooms.user_name,
                            user_id: teacherWithClassrooms.user_id,
                            email: classroom.teacher.email,
                            permission_id: classroom.permission.status_id,
                            permission_name: classroom.permission.status_name,
                            student_count: countStatus2,
                            code: classroom.code,
                            students: classroom.students.map(studentData => ({
                                student_id: studentData.student.user_id,
                                student_name: studentData.student.user_name,
                                status: {
                                    status_id: studentData.status.status_id,
                                    status_name: studentData.status.status_name,
                                },
                                position: {
                                    position_id: studentData.position.position_id,
                                    position_name: studentData.position.position_name,
                                },
                            })),
                        };
                    }),
                };
                break;
            case 'student_classroom':
                const studentWithClassrooms = await db.users.findUnique({
                    where: { user_id: userIDInt },
                    include: {
                        classroomStudents: {
                            include: {
                                classRoom: {
                                    include: {
                                        subject: true,
                                        subject_type: true,
                                        color: true,
                                        permission: true,
                                        teacher: true,
                                        students: true,
                                    },
                                },
                                status: true,
                                position: true, // ดึงข้อมูลตำแหน่งจาก Position
                            },
                        },
                    },
                });
                // ตรวจสอบว่า userWithClassrooms เป็น null หรือไม่
                if (!studentWithClassrooms) {
                    console.error('User not found');
                    return; // หรือ throw new Error('User not found');
                }

                // สร้างอ็อบเจ็กต์รวมข้อมูล
                data = {
                    classrooms: studentWithClassrooms.classroomStudents.map(classroom => {
                        const studentCountWithPermissionId2 = classroom.classRoom.students
                            ? classroom.classRoom.students.filter(student => student.status_id === 2).length
                            : 0;
                        return {
                            class_id: classroom.classRoom.class_id,
                            class_name: classroom.classRoom.class_name,
                            description: classroom.classRoom.description,
                            subject_id: classroom.classRoom.subject.subject_id,
                            subject_name: classroom.classRoom.subject.subject_name,
                            subject_type_id: classroom.classRoom.subject_type.subject_type_id,
                            subject_type_name: classroom.classRoom.subject_type.subject_type_name,
                            color_id: classroom.classRoom.color.color_id,
                            color_name: classroom.classRoom.color.color_name,
                            teacher_id: classroom.classRoom.teacher.user_id,
                            teacher_name: classroom.classRoom.teacher.user_name,
                            user_name: studentWithClassrooms.user_name,
                            user_id: studentWithClassrooms.user_id,
                            email: classroom.classRoom.teacher.email,
                            permission_id: classroom.classRoom.permission.status_id,
                            permission_name: classroom.classRoom.permission.status_name,
                            position_id: classroom.position.position_id,
                            position_name: classroom.position.position_name,
                            student_count: studentCountWithPermissionId2, // เพิ่มจำนวนที่นับได้
                            status_id: classroom.status.status_id,
                            status_name: classroom.status.status_name,
                        };
                    }),
                };
                break;
            case 'classSetting':
                const userWithSettingClass = await db.classRoom.findMany({
                    where: { user_id: userIDInt },
                });
                if (userWithSettingClass.length <= 0) {
                    console.error('Error fetching data 404:');
                    return Response.json({  }, { status:400 });
                } else {
                    data = data = await db.classRoom.findUnique({
                        where: { class_id: classIDInt },
                    });
                }
                break;
            default:
                return Response.json({ error: 'Invalid table name' }, { status: 400 }); // ข้อผิดพลาดหากไม่พบ table ที่ระบุ
        }

        // ส่งคืนข้อมูล
        return Response.json(data, { status: 200 });

    } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
