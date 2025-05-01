import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { RegisterFormSchema } from '@/utils/AuthSchema'
import { z } from 'zod'
import { Eye, EyeClosed } from 'lucide-react'
import React from 'react'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const Step2 = ({
  register,
  errors,
}: {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
}) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <>
      <label htmlFor='username' className='mt-3 block'>
        <span className='block mb-1'>Username</span>
        <input
          type='text'
          id='username'
          {...register('username')}
          placeholder='Enter your username'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.username
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.username && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.username?.message}
        </p>
      )}

      <label htmlFor='email' className='mt-3 block'>
        <span className='block mb-1'>Email</span>
        <input
          type='email'
          id='email'
          {...register('email')}
          placeholder='Enter your email'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.email
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.email && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.email?.message}
        </p>
      )}

      <label htmlFor='password' className='mt-3 block'>
        <span className='block mb-1'>Password</span>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            {...register('password')}
            placeholder='Enter your password'
            className={`text-sm w-full py-3 px-3 rounded-lg border ${
              errors.password
                ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
                : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
            }`}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer'
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        </div>
      </label>
      {errors.password && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.password?.message}
        </p>
      )}
    </>
  )
}

export default Step2
