import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl;




  if (pathname.startsWith('/classroom')) {
    if (user?.role === '1' && pathname !== '/classroom_student') {
      return NextResponse.redirect(new URL(`/classroom_student`, request.url)); // ส่ง classId ไปด้วย
    } else if (user?.role === '2' && pathname !== '/classroom_teacher') {
      return NextResponse.redirect(new URL(`/classroom_teacher`, request.url)); // ส่ง classId ไปด้วย
    }
  }


  if (pathname.startsWith('/dashboard')) {
    if (user?.role === '1' && pathname !== '/dashboard_student') {
      return NextResponse.redirect(new URL(`/dashboard_student`, request.url)); // ส่ง classId ไปด้วย
    } else if (user?.role === '2' && pathname !== '/dashboard_teacher') {
      return NextResponse.redirect(new URL(`/dashboard_teacher`, request.url)); // ส่ง classId ไปด้วย
    }
  }







  return NextResponse.next()
}
