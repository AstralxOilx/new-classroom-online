import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { id, className, classDescription } = await request.json();
        const userIdInt = parseInt(id, 10);
        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        });
        // ตรวจสอบว่าเจอผู้ใช้และเช็ค role
        if (user) {
            if (user.role === 'teacher'){
                try {
                    const newClassRoom = await db.classRoom.create({
                        data: {
                            class_name:className,
                            teacher_id:userIdInt,
                            description:classDescription,
                        },
                    });
                    return Response.json({
                        message: 'Classroom created successfully!',
                        classRoom: newClassRoom,
                    }, { status: 200 }); 
                } catch (error) {
                    return Response.json({
                        message: 'Unauthorized: Only teachers can create classrooms.',
                    }, { status: 400 }); 
                }
                
            } else {
                return Response.json({
                    message: 'Created not found!',
                }, { status: 400 });
            }
        }

        return Response.json({
            message: 'User created successfully!',
            data: {
                id,
                className,
                classDescription
            }
        })

    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}