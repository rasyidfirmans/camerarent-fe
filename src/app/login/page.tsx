'use client'

import Button from '@/components/Button'
import { LoginFormSchema } from '@/utils/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type LoginFormData = z.infer<typeof LoginFormSchema>

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) })

  const onSubmit = (data: LoginFormData) => {
    console.log(data)
  }

  return (
    <main className='flex justify-center items-center w-full min-h-[100dvh] py-10'>
      <div className='w-[23rem] sm:w-[25rem] md:w-[30rem] text-[#2C3F6D] rounded-xl p-10 bg-white shadow-xl shadow-gray-400'>
        <div className='flex items-center'>
          <Image
            src={`/images/logo.png`}
            alt='camerarent'
            width={0}
            height={0}
            sizes='100vw'
            className='size-[55px] mr-3'
          />
          <div className=''>
            <p>Welcome back!</p>
            <p className='text-4xl font-bold'>Sign In</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <label className='flex items-center mt-3 cursor-pointer'>
            <input
              type='checkbox'
              className='mr-2 accent-[#3E5899] w-5 h-5 rounded-xl border-gray-300'
            />
            <span className='text-sm text-gray-700'>Remember me</span>
          </label>

          <Button
            type='submit'
            variant='bg-[#3E5899] w-full py-3 border-2 border-[#3E5899] rounded-xl text-white mt-5 font-bold '
          >
            Log In
          </Button>
        </form>

        <div>
          <p className='text-center text-[#898989] mt-3'>
            Don&lsquo;t have an account?{' '}
            <Link
              href={'/register'}
              className='text-[#2C3F6D] font-bold hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
