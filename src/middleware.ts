import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl;

  // ถ้าผู้ใช้เป็น student และกำลังจะเข้าหน้า /classroom แต่ยังไม่อยู่ที่ /classroom_student
  if (pathname.startsWith('/classroom') && user?.role === 'student' && pathname !== '/classroom_student') {
    return NextResponse.redirect(new URL('/classroom_student', request.url))
  }

  // ถ้าผู้ใช้เป็น teacher และกำลังจะเข้าหน้า /classroom แต่ยังไม่อยู่ที่ /classroom_teacher
  if (pathname.startsWith('/classroom') && user?.role === 'teacher' && pathname !== '/classroom_teacher') {
    return NextResponse.redirect(new URL('/classroom_teacher', request.url))
  }

  console.log(`User role: ${user?.role}`)
  console.log(`Redirecting to: ${new URL('/classroom_student', request.url)}`)

  return NextResponse.next()
}
