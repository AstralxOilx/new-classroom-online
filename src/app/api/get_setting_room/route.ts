import { db } from '@/lib/db';

export async function POST(request: Request ,response:Response) {
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
                    const getClassRoom = await db.classRoom.findMany({
                        where: { teacher_id: userIdInt }
                    });
                    return  Response.json({
                        getClassRoom
                    })
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
        },{ status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return Response.json({
            error
        }, { status: 500 });
    }

}