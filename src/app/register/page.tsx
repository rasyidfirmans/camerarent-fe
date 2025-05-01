'use client'

import Button from '@/components/Button'
import { RegisterFormSchema } from '@/utils/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Step1 from './Step1'
import Step2 from './Step2'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import { MoveLeft, MoveRight } from 'lucide-react'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const steps = [
  {
    id: 1,
    name: 'Provide your details',
  },
  {
    id: 2,
    name: 'Create an account',
  },
]

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterFormSchema) })

  const onSubmit = (data: RegisterFormData) => {
    console.log(data)
  }

  const next = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className='flex justify-center items-center w-full min-h-[100dvh] py-10'>
      <div className='w-[23rem] sm:w-[25rem] md:w-[30rem] relative text-[#2C3F6D] rounded-xl p-10 bg-white overflow-hidden shadow-xl shadow-gray-400'>
        <div className='absolute top-0 left-0 w-full h-1 bg-amber-300'>
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        <div className='flex items-center'>
          <Image
            src={`/images/logo.png`}
            alt='camerarent'
            width={0}
            height={0}
            sizes='100vw'
            className='size-[55px] mr-3'
          />
          <div>
            <p>Welcome aboard!</p>
            <p className='text-4xl font-bold'>Sign Up</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && <Step1 register={register} errors={errors} />}
          {currentStep === 2 && <Step2 register={register} errors={errors} />}

          {currentStep === 1 && (
            <Button
              type='button'
              variant='flex items-center justify-center gap-x-2 bg-[#3E5899] w-full py-3 border-2 border-[#3E5899] rounded-xl text-white mt-5 font-bold'
              onClick={() => {
                handleSubmit(() => {
                  next()
                })()
              }}
            >
              <p>Next</p>
              <MoveRight />
            </Button>
          )}

          {currentStep === 2 && (
            <>
              <Button
                type='submit'
                variant='bg-[#3E5899] w-full py-3 border-2 border-[#3E5899] rounded-xl text-white mt-5 font-bold'
              >
                Register
              </Button>
              <Button
                type='button'
                variant='flex items-center justify-center gap-x-2 bg-transparent text-[#3E5899] w-full py-3 border-2 border-[#3E5899] rounded-xl mt-5 font-bold'
                onClick={prev}
              >
                <MoveLeft />
                <p>Back</p>
              </Button>
            </>
          )}
        </form>

        <div>
          <p className='text-center text-[#898989] mt-3'>
            Already have an account?{' '}
            <Link
              href={'/login'}
              className='text-[#2C3F6D] font-bold hover:underline'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
