import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { userId, code } = await request.json();
        const userIdInt = parseInt(userId, 10);
        const classroom = await db.classRoom.findUnique({
            where: { code: code },
        });

        if (!classroom) {
            return Response.json({
                message: 'Failed to add classroom!',
            }, { status: 400 })
        }

        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        })

        const classroomStudent = await db.classroomStudent.findMany({
            where: {
              student_id: userIdInt,
              class_id: classroom?.class_id
            }
          });

        if (user) {
            try {
                if (user.role === "student") {
                    if (classroomStudent.length === 0) {
                        const addClassRoom = await db.classroomStudent.create({
                            data: {
                                class_id: classroom?.class_id,
                                student_id: userIdInt,
                                status: classroom.permission,
                            }
                        }) 
                        return Response.json({
                            message: 'Successfully to add classroom!',
                        }, { status: 200 })
                      } else {
                        return Response.json({
                            message: 'You already have this classroom!',
                        }, { status: 400 })
                      }
                   
                   
                } else {
                    return Response.json({
                        message: 'Failed to add classroom!',
                    }, { status: 400 })
                }
            } catch (error) {
                return Response.json({
                    message: 'Failed to add classroom!',
                }, { status: 400 })
            }
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}