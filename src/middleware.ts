import { NextRequest, NextResponse } from 'next/server'
import { getRefreshAccessToken } from './lib/getToken'

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/cart', '/payment', '/transaction']
  const pathname = request.nextUrl.pathname
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  )
  let isLoggedIn = request.cookies.get('access_token')?.value ? true : false

  if (!isLoggedIn && request.cookies.get('refresh_token')?.value) {
    const refreshResponse = await getRefreshAccessToken(request)
    if (refreshResponse) {
      return refreshResponse
    }
    isLoggedIn = request.cookies.get('access_token')?.value ? true : false
  }

  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|static/|images/).*)'],
}
