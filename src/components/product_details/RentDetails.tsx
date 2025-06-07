'use client'

import { LoginContext } from '@/context/LoginContext'
import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RentFormSchema = z
  .object({
    start_date: z.preprocess(
      (val) => (val ? new Date(val as string) : null),
      z
        .date({
          required_error: 'Start date is required',
          invalid_type_error: 'Invalid start date',
        })
        .refine((date) => date && date.getTime() >= new Date().getTime(), {
          message: 'Start date must be at least 1 minute in the future',
        })
    ),
    end_date: z.preprocess(
      (val) => (val ? new Date(val as string) : null),
      z.date({
        required_error: 'End date is required',
        invalid_type_error: 'Invalid end date',
      })
    ),
    quantity: z.preprocess(
      (val) => (typeof val === 'string' ? Number(val) : val),
      z.number().min(1, { message: 'Quantity must be at least 1' })
    ),
  })
  .superRefine((data, ctx) => {
    if (
      data.start_date &&
      data.end_date &&
      new Date(data.end_date).getTime() <= new Date(data.start_date).getTime()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end_date'],
        message: 'End date must be after start date',
      })
    }
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date) {
      const start = new Date(data.start_date)
      const end = new Date(data.end_date)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['end_date'],
          message: 'Rent period must be at least 1 day',
        })
      }
      if (diffDays > 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['end_date'],
          message: 'Rent period cannot exceed 1 week',
        })
      }
    }
  })

type RentDetailProps = {
  product: { product_id: number; price: number | string }
}

const toMysqlDatetime = (isoString) => {
  const date = new Date(isoString)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const RentDetails = (props: RentDetailProps) => {
  const { product } = props

  const [quantity, setQuantity] = useState<number>(1)
  const rentPeriodRef = useRef<HTMLParagraphElement>(null)
  const subTotalRef = useRef<HTMLParagraphElement>(null)
  const { isLoggedIn } = useContext(LoginContext)
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RentFormSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  })
  const rentFormFields = watch()

  const cartMutation = async (rentData: {
    start_date: string
    end_date: string
    quantity: number
  }) => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            product_id: product.product_id,
            ...rentData,
          },
        }
      )

      return res
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw new Error('Failed to add to cart')
    }
  }

  const mutation = useMutation({
    mutationFn: (rentData: {
      start_date: string
      end_date: string
      quantity: number
    }) => cartMutation(rentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_cart'] })
    },
  })

  const onSubmit = (data: z.infer<typeof RentFormSchema>) => {
    const endDate = toMysqlDatetime(data.end_date.toISOString())
    const startDate = toMysqlDatetime(data.start_date.toISOString())
    const convertedData = {
      ...data,
      start_date: startDate,
      end_date: endDate,
    }

    if (!isLoggedIn) {
      router.push('/login')
    } else {
      mutation.mutate(convertedData)
      router.push('/cart')
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const currQuantity = prevQuantity - 1
        calculateSubTotal(product.price, currQuantity)
        return currQuantity
      })
      setValue('quantity', quantity - 1)
    }
  }

  const increment = () => {
    setQuantity((prevQuantity) => {
      const currQuantity = prevQuantity + 1
      calculateSubTotal(product.price, currQuantity)
      return currQuantity
    })
    setValue('quantity', quantity + 1)
  }

  const calculateRentPeriod = () => {
    if (rentFormFields.start_date && rentFormFields.end_date) {
      const start = new Date(rentFormFields.start_date as Date)
      const end = new Date(rentFormFields.end_date as Date)

      if (start <= end) {
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays >= 1) {
          if (rentPeriodRef.current) {
            rentPeriodRef.current.innerHTML = `${diffDays} day${
              diffDays > 1 ? 's' : ''
            }`
          }
          return diffDays
        }
      }
    }
  }

  const calculateSubTotal = (price: number | string, quantity: number) => {
    product.price =
      typeof product.price === 'string'
        ? parseFloat(product.price)
        : product.price
    const diffDays = calculateRentPeriod()

    if (diffDays) {
      const subTotal = product.price * quantity * diffDays
      if (subTotalRef.current) {
        subTotalRef.current.innerHTML = subTotal.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })
      }
    }
  }

  return (
    <section className='w-full lg:w-1/2 xl:w-1/3 h-full bg-white/20 backdrop-blur-md rounded-xl border border-slate-300 p-5 shadow-xl'>
      <div className='w-full h-full p-3 overflow-y-auto'>
        <h1 className='font-bold text-secondary-blue text-xl md:text-2xl'>
          Rent Details
        </h1>
        <div className='w-full h-0.5 bg-slate-200 my-2'></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-5'
        >
          <label htmlFor='start_date'>
            <span className='font-bold'>Start Date</span>
            <input
              type='datetime-local'
              {...register('start_date', {
                required: 'Start date is required',
              })}
              id='start_date'
              className={`block mt-3 w-full text-slate-600 border px-5 py-3 rounded-xl focus:outline-0 focus:ring-2 focus:ring-offset-2 ${
                errors.start_date
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-400 focus:ring-primary-blue'
              }`}
              onBlur={() => {
                calculateRentPeriod()
                calculateSubTotal(product.price, quantity)
              }}
            />
            <p
              className={`${
                errors.start_date ? 'block text-red-600 mt-3' : 'hidden'
              }`}
            >
              {errors.start_date?.message}
            </p>
          </label>

          <label htmlFor='end_date'>
            <span className='font-bold'>End Date</span>
            <input
              type='datetime-local'
              {...register('end_date', {
                required: 'Start date is required',
              })}
              id='end_date'
              className={`block mt-3 w-full text-slate-600 border px-5 py-3 rounded-xl focus:outline-0 focus:ring-2 focus:ring-offset-2 ${
                errors.end_date
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-slate-400 focus:ring-primary-blue'
              }`}
              onBlur={() => {
                calculateRentPeriod()
                calculateSubTotal(product.price, quantity)
              }}
            />
            <p
              className={`${
                errors.end_date ? 'block text-red-600 pt-3' : 'hidden'
              }`}
            >
              {errors.end_date?.message}
            </p>
          </label>

          <div className='w-full flex justify-between items-center'>
            <p className='font-bold'>Quantity</p>
            <div className='w-36 flex items-center gap-x-5 bg-secondary-yellow/20 rounded-lg p-2'>
              <Minus
                onClick={() => {
                  decrement()
                }}
                className='size-8 rounded-lg font-bold bg-primary-blue hover:bg-secondary-blue text-white p-2 cursor-pointer'
              />
              <p className='flex-1 select-none align-bottom text-center'>
                {quantity}
              </p>
              <Plus
                onClick={() => {
                  increment()
                }}
                className='size-8 rounded-lg font-bold bg-primary-blue hover:bg-secondary-blue text-white p-2 cursor-pointer'
              />
            </div>
            <input
              type='hidden'
              {...register('quantity', { required: 'Quantity is required' })}
              value={quantity}
            />
            <p
              className={`${errors.quantity ? 'block text-red-600' : 'hidden'}`}
            >
              {errors.quantity?.message}
            </p>
          </div>

          <div className='flex flex-col gap-y-3'>
            <div className='w-full flex items-center justify-between'>
              <p>Rent Period</p>
              {!errors.start_date && !errors.end_date && !errors.quantity && (
                <p ref={rentPeriodRef} className='font-bold'></p>
              )}
            </div>
            <div className='w-full flex items-center justify-between'>
              <p>product.price</p>
              <p className='font-bold'>
                {Number(product.price).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p>Discount</p>
              <p className='font-bold'>
                {Number(0).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p className='font-bold'>Sub Total</p>
              {!errors.start_date && !errors.end_date && !errors.quantity && (
                <p ref={subTotalRef} className='font-bold'></p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='w-full flex items-center justify-center bg-secondary-yellow hover:bg-primary-yellow py-5 font-bold rounded-xl gap-x-3'
          >
            <ShoppingCart />
            <span>Add to Cart</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default RentDetails
