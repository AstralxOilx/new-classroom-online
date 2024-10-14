import { db } from '@/lib/db';
import { get } from 'http';

export async function POST(request: Request, response: Response) {
    try {
        const { id } = await request.json();
        const userIdInt = parseInt(id, 10);
        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        });


        if (user) {
            if (user.role === 'student') {
                try {
                    // ค้นหาข้อมูล classroomStudents พร้อมข้อมูลห้องเรียนที่เกี่ยวข้อง
                    const classroomData = await db.classroomStudent.findMany({
                        where: { student_id: userIdInt },
                        include: {
                            classRoom: true, // รวมข้อมูลจาก classRoom ที่เกี่ยวข้อง
                        },
                    });

                    // สร้าง array ของข้อมูลที่ต้องการ
                    const combinedData = classroomData.map(student => ({
                        student_iId: student.student_id,
                        teacher_id: student.classRoom.teacher_id,
                        class_id: student.class_id,
                        class_name: student.classRoom.class_name,
                        color: student.classRoom.colors,
                        subject_type: student.classRoom.subject_type,
                        subject: student.classRoom.subject,
                        description: student.classRoom.description,
                        status: student.status,
                    }));

                    // นับจำนวนผู้ใช้ในแต่ละห้อง
                    const classRooms = await Promise.all(combinedData.map(async (classroom) => {
                        const count = await db.classroomStudent.count({
                            where: {
                                class_id: classroom.class_id,
                                status: 'active',
                            }
                        });

                        return {
                            ...classroom,
                            userCount: count // เพิ่มจำนวนผู้ใช้ในแต่ละห้องเรียน
                        };
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
            } else {
                return Response.json({
                    message: 'Get Class Room not found!',
                }, { status: 400 });
            }
        }

        return Response.json({
            message: 'Get Class Room successfully!',
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}