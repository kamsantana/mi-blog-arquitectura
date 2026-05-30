// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value

  // Bloquea el acceso a /admin si no existe la cookie de autenticación
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}