import { NextRequest, NextResponse } from 'next/server'
import { ApiResponseCart } from './components/cart/CartBody'
import { api } from './lib/apiClient'
import { getCookieAccessToken, getRefreshAccessToken } from './lib/getToken'

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/cart', '/payment', '/transaction', '/dashboard']
  const superUserPaths = ['/dashboard/orders', '/dashboard/products']
  const pathname = request.nextUrl.pathname
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  )
  const isSuperUserPath = superUserPaths.some((path) =>
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

  if (isLoggedIn && isSuperUserPath) {
    const role = request.cookies.get('role')?.value
    if (role === 'admin') {
      return NextResponse.next()
    } else if (role === 'user') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isLoggedIn && pathname.startsWith('/payment')) {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.get<ApiResponseCart>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )

      if (res.data.length > 0) {
        return NextResponse.next()
      } else {
        const cartUrl = new URL('/cart', request.url)
        cartUrl.searchParams.set('error', 'empty_cart_payment_attempt')
        return NextResponse.redirect(cartUrl)
      }
    } catch (error) {
      console.error('Error in payment middleware:', error)
      const cartUrl = new URL('/cart', request.url)
      cartUrl.searchParams.set('error', 'cart_fetch_failed')
      return NextResponse.redirect(cartUrl)
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|static/|images/).*)'],
}
