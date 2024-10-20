import { db } from '@/lib/db';

export async function POST(request: Request) {
    const { userID, email, code } = await request.json();
    const userIDInt = parseInt(userID);
    try {
        const user = await db.users.findUnique({
            where: {
                user_id: userIDInt,
                email: email
            },
        });

        if (user) {
                const classroom = await db.classRoom.findUnique({
                    where: { code: code }
                });
                if (classroom) {
                    const existingClassStudent = await db.classroomStudent.findMany({
                        where: { class_id: classroom.class_id,
                                 user_id: userIDInt,
                         }
                    });
                    if (existingClassStudent.length > 0) {
                        return Response.json({
                            message: 'This classroom already exists.',
                        }, { status: 400 });
                    } else {
                        const joinedClassroom = await db.classroomStudent.create({
                            data: {
                                class_id: classroom.class_id,
                                user_id: user.user_id,
                                status_id: classroom.permission_id,
                            }
                        })

                        return Response.json({
                            message: 'Classroom Joined successfully!',
                            className: classroom.class_name,
                        }, { status: 200 });
                    }
                }else{
                    return Response.json({
                        message: 'This classroom does not exist.',
                    }, { status: 400 });
                }
            
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
