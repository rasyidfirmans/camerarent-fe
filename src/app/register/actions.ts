'use server'

import { apiFetch } from '@/lib/apiClient'
import { RegisterFormSchema } from '@/lib/authSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const registerAction = async (loginData: RegisterFormData) => {
  const formData = new FormData()

  Object.entries(loginData).forEach(([key, value]) => {
    formData.append(key, value as string)
  })

  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const parsedResponse = response as {
      code: number
      message: string
    }

    if (parsedResponse.code !== 201) {
      return {
        status: false,
        message: parsedResponse.message,
      }
    }

    return {
      status: true,
      message: parsedResponse.message,
    }
  } catch (error) {
    console.error('Register error:', error)
    return {
      status: false,
      message: 'An error occurred during registration.',
    }
  }
}

export { registerAction }
