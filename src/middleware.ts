import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl;
  // ดึง query parameter classId จาก URL
  const url = new URL(request.url);
  const classId = url.searchParams.get('classId'); // อ่านค่า classId


  // ถ้าผู้ใช้เป็น student และกำลังจะเข้าหน้า /classroom แต่ยังไม่อยู่ที่ /classroom_student
  if (pathname.startsWith('/classroom') && user?.role === 'student' && pathname !== '/classroom_student') {
    return NextResponse.redirect(new URL('/classroom_student', request.url))
  } else if (pathname.startsWith('/classroom') && user?.role === 'teacher' && pathname !== '/classroom_teacher') {
    return NextResponse.redirect(new URL('/classroom_teacher', request.url))
  } else if (pathname.startsWith('/dashboard') && user?.role === 'student' && pathname !== '/dashboard_student') {
    return NextResponse.redirect(new URL('/dashboard_student', request.url))
  } else if (pathname.startsWith('/dashboard') && user?.role === 'teacher' && pathname !== '/dashboard_teacher') {
    return NextResponse.redirect(new URL('/dashboard_teacher', request.url))
  }

  // ตรวจสอบ role ของ user และ pathname
  if (pathname.startsWith('/setting')) {
    if (user?.role === 'student' && pathname !== '/class_setting_student') {
      return NextResponse.redirect(new URL(`/class_setting_student/${classId}`, request.url)); // ส่ง classId ไปด้วย
    } else if (user?.role === 'teacher' && pathname !== '/class_setting_teacher') {
      return NextResponse.redirect(new URL(`/class_setting_teacher/${classId}`, request.url)); // ส่ง classId ไปด้วย
    }
  }

  console.log('User:', user);
  console.log('User Role:', user?.role);
  console.log('Current Pathname:sss', pathname);



  return NextResponse.next()
}
