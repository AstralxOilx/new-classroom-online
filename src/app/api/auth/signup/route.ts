import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json();


        // เช็คว่าอีเมลมีอยู่ในฐานข้อมูลหรือไม่
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
                user_name: name,
                email: email,
                password: hashedPassword,
                role: role,
            },
        })

        return Response.json({
            message: 'User created successfully!',
            data:{
                newUser
            }
        })

    } catch (error) {
        return Response.json({
            error
        }, { status: 500 });
    }

}