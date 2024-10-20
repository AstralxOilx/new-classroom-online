import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    identification: string;
  }
  interface Session {
    user: User & {
      id: string;
      email: string;
      username: string;
      role: string;
      identification: string;
    }
    token: {
      id: string;
      email: string;
      username: string;
      role: string;
      identification: string;
    }
  }
}