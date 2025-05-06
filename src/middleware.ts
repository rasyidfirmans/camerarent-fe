import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/register']

  const pathname = request.nextUrl.pathname
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  const isLoggedIn = request.cookies.get('access_token')?.value ? true : false

  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|static/|images/).*)'],
}
