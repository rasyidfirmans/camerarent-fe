'use server'

import { cookies } from 'next/headers'
import { apiFetch } from './apiClient'

// Logout function
const handleLogout = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')
  const refreshToken = cookieStore.get('refresh_token')

  if (accessToken && refreshToken) {
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')

    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    )

    const parsedResponse = response as {
      code: number
      message: string
    }

    if (parsedResponse.code !== 200) {
      return {
        status: false,
        message: parsedResponse.message,
      }
    }

    return {
      status: true,
      message: parsedResponse.message,
    }
  }
}

export default handleLogout
