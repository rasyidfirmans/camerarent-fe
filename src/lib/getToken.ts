'use server'

import { cookies } from 'next/headers'
import { apiFetch } from './apiClient'
import { NextRequest, NextResponse } from 'next/server'

export const getRefreshAccessToken = async (request: NextRequest) => {
  const newAccessToken = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/refresh`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      token: request.cookies.get('refresh_token')?.value,
    }
  ).then((res) => res)

  const accessToken = (newAccessToken as { access_token: string }).access_token

  const res = NextResponse.next()
  res.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60,
  })
  return res
}

export const getCookieAccessToken = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  return accessToken
}
