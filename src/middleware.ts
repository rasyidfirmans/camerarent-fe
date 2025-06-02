import { NextRequest, NextResponse } from 'next/server'
import { getRefreshAccessToken } from './lib/getToken'

export async function middleware(request: NextRequest) {
  const publicPaths = ['/', '/product', '/login', '/register']
  const pathname = request.nextUrl.pathname
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  const isLoggedIn = request.cookies.get('access_token')?.value ? true : false

  if (!isLoggedIn && request.cookies.get('refresh_token')?.value) {
    return await getRefreshAccessToken(request)
  }

  // if (isPublicPath && isLoggedIn) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|static/|images/).*)'],
}
