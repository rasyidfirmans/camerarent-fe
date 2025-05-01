import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { RegisterFormSchema } from '@/utils/AuthSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const Step1 = ({
  register,
  errors,
}: {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
}) => {
  return (
    <>
      <label htmlFor='fullname' className='mt-3 block'>
        <span className='block mb-1'>Full Name</span>
        <input
          type='text'
          id='fullname'
          {...register('fullname')}
          placeholder='Enter your fullname'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.fullname
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.fullname && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.fullname?.message}
        </p>
      )}

      <label htmlFor='phone' className='mt-3 block'>
        <span className='block mb-1'>Phone Number</span>
        <input
          type='text'
          id='phone'
          {...register('phone')}
          placeholder='Enter your phone'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.phone
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.phone && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.phone?.message}
        </p>
      )}

      <label htmlFor='citizenship' className='mt-3 block'>
        <span className='block mb-1'>Citizenship</span>
        <input
          type='file'
          id='citizenship'
          {...register('citizenship')}
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.citizenship
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.citizenship && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {typeof errors.citizenship?.message === 'string'
            ? errors.citizenship.message
            : ''}
        </p>
      )}
    </>
  )
}

export default Step1
