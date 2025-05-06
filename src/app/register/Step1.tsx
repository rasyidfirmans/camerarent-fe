import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { RegisterFormStep1Schema } from '@/utils/AuthSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormStep1Schema>

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
          {...register('name')}
          placeholder='Enter your fullname'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.name
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.name && (
        <p className='text-red-600 text-sm mb-2 mt-1'>{errors.name?.message}</p>
      )}

      <label htmlFor='phone_number' className='mt-3 block'>
        <span className='block mb-1'>Phone Number</span>
        <input
          type='text'
          id='phone_number'
          {...register('phone_number')}
          placeholder='Enter your phone'
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.phone_number
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.phone_number && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {errors.phone_number?.message}
        </p>
      )}

      <label htmlFor='citizenship_image' className='mt-3 block'>
        <span className='block mb-1'>Citizenship Image</span>
        <input
          type='file'
          id='citizenship_image'
          {...register('citizenship_image')}
          className={`text-sm w-full py-3 px-3 rounded-lg border ${
            errors.citizenship_image
              ? 'border-red-600 focus:outline focus:outline-red-600 placeholder:text-red-600'
              : 'not-focus:border-gray-400 focus:border-[#92A5D3] focus:outline focus:outline-[#92A5D3]'
          }`}
        />
      </label>
      {errors.citizenship_image && (
        <p className='text-red-600 text-sm mb-2 mt-1'>
          {typeof errors.citizenship_image?.message === 'string'
            ? errors.citizenship_image.message
            : ''}
        </p>
      )}
    </>
  )
}

export default Step1
