'use server'

import { RegisterFormSchema } from '@/utils/AuthSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const registerAction = async (loginData: RegisterFormData) => {
  const fetcher = async (url: string, data: RegisterFormData) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    return await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
  }

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      loginData
    )
    if (!response.ok) {
      const errorData = await response.json()
      return { status: false, message: errorData.message }
    }

    return { status: true, message: 'Login successful' }
  } catch (error) {
    console.error('Error:', error)
    return { status: false, message: 'Login failed' }
  }
}

export { registerAction }
