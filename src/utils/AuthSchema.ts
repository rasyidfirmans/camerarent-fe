import { z } from 'zod'

const RegisterFormStep1Schema = z.object({
  fullname: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  citizenship: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: 'File is required',
    }),
})

const RegisterFormStep2Schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

const RegisterFormSchema = RegisterFormStep1Schema.merge(
  RegisterFormStep2Schema
)

export {
  RegisterFormSchema,
  RegisterFormStep1Schema,
  RegisterFormStep2Schema,
  LoginFormSchema,
}
