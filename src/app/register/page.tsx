'use client'

import Button from '@/components/Button'
import {
  RegisterFormStep2Schema,
  RegisterFormStep1Schema,
} from '@/utils/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Step1 from './Step1'
import Step2 from './Step2'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import { MoveLeft, MoveRight } from 'lucide-react'

type RegisterFormStep1 = z.infer<typeof RegisterFormStep1Schema>
type RegisterFormStep2 = z.infer<typeof RegisterFormStep2Schema>

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
  const [formData, setFormData] = React.useState<
    RegisterFormStep1 | RegisterFormStep2
  >()
  const formStep1 = useForm<RegisterFormStep1>({
    resolver: zodResolver(RegisterFormStep1Schema),
  })
  const formStep2 = useForm<RegisterFormStep2>({
    resolver: zodResolver(RegisterFormStep2Schema),
  })

  const onSubmit = (data: RegisterFormStep2) => {
    const finalData = {
      ...formData,
      ...data,
    }
    setFormData(finalData)
  }

  const next = (data: RegisterFormStep1) => {
    setFormData(data)

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

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

        <form onSubmit={formStep2.handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <Step1
              register={formStep1.register}
              errors={formStep1.formState.errors}
            />
          )}
          {currentStep === 2 && (
            <Step2
              register={formStep2.register}
              errors={formStep2.formState.errors}
            />
          )}

          {currentStep === 1 && (
            <Button
              type='button'
              variant='flex items-center justify-center gap-x-2 bg-[#3E5899] w-full py-3 border-2 border-[#3E5899] rounded-xl text-white mt-5 font-bold'
              onClick={formStep1.handleSubmit(next)}
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
