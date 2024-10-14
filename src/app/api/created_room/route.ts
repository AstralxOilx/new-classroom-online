import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const { id, className, classDescription ,color,permission,subject,type} = await request.json();

        const userIdInt = parseInt(id, 10);
        const classroomCode =  uuidv4();
        const user = await db.users.findUnique({
            where: { user_id: userIdInt },
        });
        // ตรวจสอบว่าเจอผู้ใช้และเช็ค role
        if (user) {
            if (user.role === 'teacher'){
                try {
                    const newClassRoom = await db.classRoom.create({
                        data:{
                            teacher_id:userIdInt,
                            class_name:className,
                            description:classDescription,
                            code:classroomCode,
                            colors:color,
                            subject_type:type,
                            subject:subject,
                            permission:permission,
                        }
                    
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
        },{ status: 200 });

    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}