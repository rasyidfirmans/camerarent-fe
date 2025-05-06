'use server'

import { LoginFormSchema } from '@/utils/AuthSchema'
import { cookies } from 'next/headers'
import { z } from 'zod'

type LoginFormData = z.infer<typeof LoginFormSchema>

const loginAction = async (loginData: LoginFormData) => {
  const fetcher = async (url: string, loginData: LoginFormData) =>
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginData),
    })

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
      loginData
    )
    if (!response.ok) {
      const errorData = await response.json()
      return { status: false, message: errorData.message }
    }

    const { access_token, refresh_token } = await response.json()

    // Creating cookies for storing token
    const cookieStore = await cookies()
    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { status: true, message: 'Login successful' }
  } catch (error) {
    console.error('Error:', error)
    return { status: false, message: 'Login failed' }
  }
}

export { loginAction }
