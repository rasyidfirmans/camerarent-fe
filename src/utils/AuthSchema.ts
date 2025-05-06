import { z } from 'zod'

const RegisterFormStep1Schema = z.object({
  name: z.string().min(1, { message: 'Fullname is required' }).max(255, {
    message: 'Fullname must be less than 255 characters',
  }),
  phone_number: z
    .string()
    .min(8, { message: 'Phone number is required' })
    .max(15, {
      message: 'Phone number must be less than 15 characters',
    }),
  citizenship_image: z
    .any()
    .refine(
      (file) =>
        file instanceof FileList &&
        file.length > 0 &&
        Array.from(file).every((f) =>
          ['image/jpeg', 'image/png', 'image/jpg'].includes(f.type)
        ),
      {
        message: 'Image file is required and must be a JPG, JPEG, or PNG',
      }
    ),
})

const RegisterFormStep2Schema = z.object({
  username: z.string().min(5, { message: 'Username is required' }).max(255, {
    message: 'Username must be less than 255 characters',
  }),
  password: z.string().min(6, { message: 'Password is required' }),
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
