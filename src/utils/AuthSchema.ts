import { z } from 'zod'

const RegisterFormSchema = z.object({
  fullname: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  citizenship: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: 'File is required',
    }),
})

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export { RegisterFormSchema, LoginFormSchema }
