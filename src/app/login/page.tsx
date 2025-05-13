'use client'

import Button from '@/components/Button'
import { LoginFormSchema } from '@/lib/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { loginAction } from './actions'

type LoginFormData = z.infer<typeof LoginFormSchema>

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) })
  const router = useRouter()

  const onSubmit = async (data: LoginFormData) => {
    const loginStatus = await loginAction(data)

    if (loginStatus.status) {
      toast.success('Login successful', {
        description: `${loginStatus.message}`,
      })
      router.push('/')
    } else {
      toast.error('Login failed', {
        description: `${loginStatus.message}`,
      })
    }
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
            variant={`bg-primary-blue w-full py-3 border-2 border-primary-blue rounded-xl text-white mt-5 font-bold ${
              isDirty && isValid
                ? 'hover:bg-secondary-blue hover:border-secondary-blue'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className='flex items-center justify-center w-full'>
                <svg
                  className='mr-3 -ml-1 size-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                <p>Loging In</p>
              </div>
            ) : (
              'Login'
            )}
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
