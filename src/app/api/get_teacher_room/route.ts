import { db } from '@/lib/db';

export async function POST(request: Request, response: Response) {
    try {
        const { id } = await request.json();
        const userIdInt = parseInt(id, 10);
        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        });
        // ตรวจสอบว่าเจอผู้ใช้และเช็ค role
        if (user) {
            if (user.role === 'teacher') {
                try {
                    // ค้นหาข้อมูลห้องเรียนที่เกี่ยวข้อง
                    const classroomData = await db.classRoom.findMany({
                        where: { teacher_id: userIdInt },
                        select: {
                            class_id: true,
                            class_name: true,
                            colors: true,
                            subject_type: true,
                            subject: true,
                            description: true,
                            code:true
                            // ไม่รวม classroomStudents แต่เราจะนับจำนวนในภายหลัง
                        },
                    });
                
                    // สร้าง array ของข้อมูลที่ต้องการ
                    const classRoomsWithCounts = await Promise.all(classroomData.map(async (classRoom) => {
                        // นับจำนวนผู้เรียนในแต่ละห้องที่มี status เป็น 'active'
                        const userCount = await db.classroomStudent.count({
                            where: {
                                class_id: classRoom.class_id,
                                status: 'active', // เงื่อนไขนับเฉพาะผู้เรียนที่มี status เป็น 'active'
                            },
                        });
                
                        return {
                            ...classRoom, // ข้อมูลจาก classRoom
                            userCount, // จำนวนผู้เรียนในห้องเรียนที่มี status เป็น 'active'
                        };
                    }));
                
                    // ส่งกลับข้อมูลในรูปแบบ JSON
                    return Response.json({
                        classRooms: classRoomsWithCounts,
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