import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { id, code} = await request.json();
        const userIdInt = parseInt(id, 10);
        const classroom = await db.classRoom.findUnique({
            where: { code: code },
        });

        if(!classroom){
            return Response.json({
                message: 'Failed to add classroom!',
            },{ status: 400 })
        }

        const user = await db.users.findUnique({
            where:{user_id:userIdInt},
        })

        if(user){
            try {
                if(user.role === "student"){
                    const addClassRoom = await db.classroomStudent.create({
                        data:{
                            class_id:classroom?.class_id,
                            student_id:user.user_id,
                            status:classroom.permission,
                        }})
                }else{
                    return Response.json({
                        message: 'Failed to add classroom!',
                    },{ status: 400 })
                }
            } catch (error) {
                return Response.json({
                    message: 'Failed to add classroom!',
                },{ status: 400 })
            }
        }

        return Response.json({
            message: 'Add Classroom successfully!',
        },{ status: 200 })
        

    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}