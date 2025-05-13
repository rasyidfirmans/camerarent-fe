'use client'

import Button from '@/components/Button'
import {
  RegisterFormStep2Schema,
  RegisterFormStep1Schema,
} from '@/lib/authSchema'
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
import { registerAction } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
  const [formDataStep1, setFormDataStep1] = React.useState<RegisterFormStep1>({
    name: '',
    phone_number: '',
    citizenship_image: undefined,
  })
  const formStep1 = useForm<RegisterFormStep1>({
    resolver: zodResolver(RegisterFormStep1Schema),
  })
  const formStep2 = useForm<RegisterFormStep2>({
    resolver: zodResolver(RegisterFormStep2Schema),
  })
  const router = useRouter()

  const onSubmit = async (data: RegisterFormStep2) => {
    const finalData: RegisterFormStep1 & RegisterFormStep2 = {
      ...formDataStep1,
      ...data,
    }

    if (finalData.citizenship_image instanceof FileList) {
      finalData.citizenship_image = finalData.citizenship_image[0]
    }

    const registerStatus = await registerAction(finalData)

    if (registerStatus.status) {
      toast.success('Login successful', {
        description: `${registerStatus.message}`,
      })
      router.push('/login')
    } else {
      toast.error('Login failed', {
        description: `${registerStatus.message}`,
      })
    }
  }

  const next = (data: RegisterFormStep1) => {
    setFormDataStep1(data)

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
              variant={`flex items-center justify-center gap-x-2 bg-primary-blue w-full py-3 border-2 border-primary-blue rounded-xl text-white mt-5 font-bold ${
                formStep1.formState.isDirty && formStep1.formState.isValid
                  ? 'hover:bg-secondary-blue hover:border-secondary-blue'
                  : 'opacity-50 cursor-not-allowed'
              }`}
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
                variant={`flex items-center justify-center gap-x-2 bg-primary-blue w-full py-3 border-2 border-primary-blue rounded-xl text-white mt-5 font-bold ${
                  formStep2.formState.isDirty && formStep2.formState.isValid
                    ? 'hover:bg-secondary-blue hover:border-secondary-blue'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {formStep2.formState.isSubmitting ? (
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
                    <p>Register</p>
                  </div>
                ) : (
                  <p>Register</p>
                )}
              </Button>
              <Button
                type='button'
                variant='flex items-center justify-center gap-x-2 bg-transparent text-primary-blue w-full py-3 border-2 border-primary-blue rounded-xl mt-5 font-bold'
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
