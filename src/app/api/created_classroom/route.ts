import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    const { userID, email, className, description, color, roomStuatus, subject, subjectType } = await request.json();
    const userIDInt = parseInt(userID);
    const colorIDInt = parseInt(color);
    const roomStuatusIDInt = parseInt(roomStuatus);
    const subjectIDInt = parseInt(subject);
    const subjectTypeIDInt = parseInt(subjectType);
    const classroomCode = uuidv4();
    try {
        const user = await db.users.findUnique({
            where: {
                user_id: userIDInt,
                email: email
            },
        });
        if (user) {
            if (user.role_id === 2) {
                const existingClass = await db.classRoom.findUnique({
                    where: { code: classroomCode }
                });

                if (existingClass) {
                    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
                } else {
                    const createdClassroom = await db.classRoom.create({
                        data: {
                            user_id: userIDInt,
                            class_name: className.trim(),
                            description: description.trim(),
                            color_id: color === "" ? Math.floor(Math.random() * (18 - 1 + 1)) + 1 : colorIDInt,
                            permission_id: roomStuatus === "" ? 1 : roomStuatusIDInt,
                            subject_id: subject === "" ? 26 : subjectIDInt,
                            subject_type_id: subjectType === "" ? 8 : subjectTypeIDInt,
                            code: classroomCode,
                        }
                    });
                    return Response.json({
                        message: 'Classroom created successfully!',
                        classRoom: createdClassroom,
                    }, { status: 200 });
                }

            }
        }

    } catch (error) {
        console.error('Error Created Classroom:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
