'use server'

import { apiFetch } from '@/lib/apiClient'
import { LoginFormSchema } from '@/lib/authSchema'
import { cookies } from 'next/headers'
import { z } from 'zod'

type LoginFormData = z.infer<typeof LoginFormSchema>

const loginAction = async (loginData: LoginFormData) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
      {
        method: 'POST',
        body: {
          username: loginData.username,
          password: loginData.password,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const parsedResponse = response as {
      code: number
      message: string
      access_token: string
      refresh_token: string
    }

    if (parsedResponse.code !== 200) {
      return {
        status: false,
        message: parsedResponse.message,
      }
    }

    const cookieStore = await cookies()

    cookieStore.set('access_token', parsedResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', parsedResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    })

    return {
      status: true,
      message: parsedResponse.message,
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      status: false,
      message: 'Login failed',
    }
  }
}

export { loginAction }
