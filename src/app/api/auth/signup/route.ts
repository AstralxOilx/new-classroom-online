import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { user_name, email, password,identification, role, } = await request.json();
        const roleInt = parseInt(role);
        const identificationReplace = identification.replace(/[-\s]/g, '');
        const existingUser = await db.users.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return  Response.json(
                { 
                    message: 'Email already exists.'
                },{ status: 400 }
            )
            
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await db.users.create({
            data: {
                user_name: user_name,
                email: email,
                password: hashedPassword,
                role_id:roleInt,
                identification: identificationReplace,
            },
        })

        return Response.json({
            message: 'User created successfully!', 
        })

    } catch (error) {
        console.error(error); // แสดงข้อผิดพลาดในบันทึก
        return Response.json(
            {
                message: 'Internal Server Error', 
            },
            { status: 500 }
        );
    }

}