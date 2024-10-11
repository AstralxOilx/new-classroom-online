import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials ,req) {

                if (!credentials?.email || !credentials?.password) return null;

                const existingUser = await db.users.findUnique({
                    where: { email: credentials.email }
                });
                
                // if (!existingUser) {
                //     return null;
                    
                // }
                if(existingUser && await bcrypt.compare(credentials.password, existingUser.password)){
                    return {
                        id: `${existingUser.user_id}`,
                        username: existingUser.user_name,
                        email: existingUser.email,
                        role: `${existingUser.role}`,
                    }
                }else{
                    throw new Error('Invalid email or password');
                }

                // const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                // if (!passwordMatch) {
                //     return null;
                // }

               
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    role: user.role 
                }
            }
            return token;
        },
        async session({ session, token }) {
            return{
                ...session,
                user:{
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    role: token.role
                }
            }
        }

    }
}
