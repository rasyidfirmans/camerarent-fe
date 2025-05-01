import { Check } from 'lucide-react'
import React from 'react'

type ProgressProps = {
  steps: {
    id: number
    name: string
  }[]
  currentStep: number
}

const Progress = (props: ProgressProps) => {
  const { steps, currentStep } = props
  return (
    <div className='relative flex items-center justify-between w-[60%] max-w-xl mx-auto mb-16'>
      <div className='absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 z-0' />
      <div
        className='absolute top-1/2 left-0 h-0.5 bg-[#DA9920] -translate-y-1/2 z-10'
        style={{ width: `${currentStep === steps.length ? 100 : 0}%` }}
      />

      {steps.map((step) =>
        step.id !== currentStep && step.id < currentStep ? (
          <div key={step.id} className='z-20 relative'>
            <div className='size-10 bg-[#DA9920] rounded-full flex items-center justify-center'>
              <Check color='white' />
            </div>
            <p className='absolute text-center text-sm left-1/2 -translate-x-1/2 w-24 mt-2'>
              {step.name}
            </p>
          </div>
        ) : step.id !== currentStep && step.id > currentStep ? (
          <div key={step.id} className='z-20 relative'>
            <div className='size-10 bg-gray-300 rounded-full flex items-center justify-center'></div>
            <p className='absolute text-center text-sm left-1/2 -translate-x-1/2 w-24 mt-2'>
              {step.name}
            </p>
          </div>
        ) : step.id === currentStep ? (
          <div key={step.id} className='z-20 relative'>
            <div className='size-10 bg-white border-2 border-[#DA9920] rounded-full flex items-center justify-center'>
              <div className='size-4 bg-[#DA9920] rounded-full'></div>
            </div>
            <p className='absolute text-center text-sm left-1/2 -translate-x-1/2 w-24 mt-2'>
              {step.name}
            </p>
          </div>
        ) : (
          ''
        )
      )}
    </div>
  )
}

export default Progress
