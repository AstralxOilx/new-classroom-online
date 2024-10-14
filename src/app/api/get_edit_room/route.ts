import { db } from '@/lib/db';

export async function POST(request: Request, response: Response) {
    try {
        const { id, classId } = await request.json();
        const userIdInt = parseInt(id, 10);
        const classIdInt = parseInt(classId, 10);
        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        });
        console.log(classId)
        // if (user) {
        //     if (user.role === 'teacher') {
        try {
            const classRoomData = await db.classRoom.findUnique({
                where: { class_id: classIdInt },
                include: {
                    students: {
                        include: {
                            student: true, // รวมข้อมูลผู้ใช้ที่เกี่ยวข้อง
                        },
                    },
                },
            });

            // ตรวจสอบว่า classRoomData ไม่เป็น null
            if (!classRoomData) {
                return Response.json({
                    message: 'Classroom not found!',
                }, { status: 404 });
            }

            // สร้างข้อมูลที่รวมกันในรูปแบบที่ต้องการ
            const classRooms = classRoomData.students.map((student) => ({
                student_iId: student.student_id,
                teacher_id: classRoomData.teacher_id,
                class_id: student.class_id,
                class_name: classRoomData.class_name,
                color: classRoomData.colors,
                subject_type: classRoomData.subject_type,
                subject: classRoomData.subject,
                description: classRoomData.description,
                status: student.status,
                studentName: student.student.user_name, // ชื่อผู้ใช้จากตาราง Users
                joinedAt: student.joined_at,
            }));

            // ส่งกลับข้อมูลในรูปแบบ JSON
            return Response.json({
                classRooms,
            });

        } catch (error) {
            return Response.json({
                message: 'Get teacher Class Room not found!',
            }, { status: 400 });
        }



        //     } else {
        //         return Response.json({
        //             message: 'Get Class Room not found!',
        //         }, { status: 400 });
        //     }
        // }

        // return Response.json({
        //     message: 'Get Class Room successfully!',
        // }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}