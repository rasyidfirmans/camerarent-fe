import { ScanLine } from 'lucide-react'
import Image from 'next/image'
import { ApiResponseCart } from '../cart/CartBody'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookieAccessToken } from '@/lib/getToken'
import { api } from '@/lib/apiClient'
import { useRouter } from 'next/navigation'

const PaymentFormSchema = z.object({
  delivery: z.string({
    message: 'Choose your delivery way',
  }),
  notes: z.string().optional(),
  payment_proof: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: 'Payment proof is required',
    })
    .refine(
      (file: FileList) =>
        Array.from(file).every((f) =>
          ['image/jpeg', 'image/png', 'image/jpg'].includes(f?.type)
        ),
      {
        message: 'Payment proof must be a JPG, JPEG, or PNG',
      }
    )
    .refine(
      (file: FileList) =>
        Array.from(file).every((f) => f?.size < 2 * 1024 * 1024),
      {
        message: 'Payment proof must be less than 2MB',
      }
    ),
})

type PaymentFormProps = {
  label: string
  style?: string
  data: ApiResponseCart
}

const PaymentForm = (props: PaymentFormProps) => {
  const { label, style, data } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  })
  const queryClient = useQueryClient()
  const router = useRouter()

  const transactionFormData = (
    submittedData: z.infer<typeof PaymentFormSchema>,
    cartData: ApiResponseCart
  ) => {
    const transactionFormData = new FormData()

    transactionFormData.append('delivery', submittedData.delivery)
    transactionFormData.append('notes', submittedData.notes ?? '')
    transactionFormData.append('payment_proof', submittedData.payment_proof[0])

    cartData.data.forEach((cartItem, index) => {
      transactionFormData.append(
        `products[${index}][product_id]`,
        cartItem.id.toString()
      )
      transactionFormData.append(
        `products[${index}][start_date]`,
        cartItem.start_date
      )
      transactionFormData.append(
        `products[${index}][end_date]`,
        cartItem.end_date
      )
      transactionFormData.append(
        `products[${index}][quantity]`,
        cartItem.quantity.toString()
      )
    })

    return transactionFormData
  }

  const transactionMutation = async (
    submittedData: z.infer<typeof PaymentFormSchema>,
    cartData: ApiResponseCart
  ) => {
    try {
      const accessToken = await getCookieAccessToken()
      const formData = transactionFormData(submittedData, cartData)
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
          body: formData,
        }
      )
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const cartQuery = async () => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.get<ApiResponseCart>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res
    } catch (error) {
      console.error('Error fetching cart:', error)
      throw error
    }
  }

  const cartMutation = async () => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/clear-cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res
    } catch (error) {
      console.error('Error fetching cart:', error)
      throw error
    }
  }

  const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponseCart>({
    queryKey: ['get_cart'],
    queryFn: cartQuery,
  })

  const storeTransaction = useMutation({
    mutationFn: ({
      submittedData,
      cartData,
    }: {
      submittedData: z.infer<typeof PaymentFormSchema>
      cartData: ApiResponseCart
    }) => transactionMutation(submittedData, cartData),
    onSuccess: () => {
      clearCart.mutate()
      queryClient.invalidateQueries({ queryKey: ['get_transaction'] })
      router.push('/history')
    },
    onError: (error) => {
      console.error('Error during transaction mutation:', error)
    },
  })

  const clearCart = useMutation({
    mutationFn: () => cartMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_cart'] })
    },
    onError: (error) => {
      console.error('Error during cart mutation:', error)
    },
  })

  const onSubmit = (submittedData: z.infer<typeof PaymentFormSchema>) => {
    if (data?.data.length === 0) {
      const cartUrl = new URL('/cart', window.location.href)
      cartUrl.searchParams.set('error', 'empty_cart_payment_attempt')
      router.push(cartUrl.toString())
    }
    if (!isLoading && !isError && cartData) {
      storeTransaction.mutate({ submittedData: submittedData, cartData })
    }
  }

  return (
    <section className={`${style} `}>
      <div className='w-full h-full bg-white rounded-xl p-5 overflow-y-auto'>
        <p className='text-lg font-bold pb-3'>{label}</p>
        <div className=''>
          <div className='flex justify-between'>
            <p className='text-sm md:text-base'>Subtotal</p>
            <p className='text-sm md:text-base font-bold'>
              {data?.total_price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className='flex justify-between mt-3'>
            <p className='text-sm md:text-base'>Discount</p>
            <p className='text-red-600 text-sm md:text-base font-bold'>
              {Number(0).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className='flex justify-between mt-5 font-bold'>
            <p className='text-sm md:text-base'>Total</p>
            <p className='text-sm md:text-base'>
              {data?.total_price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className='w-full h-0.5 bg-slate-300 mt-5'></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <p className='text-sm md:text-base font-bold mt-5'>Delivery</p>
            <div className='my-3'>
              <input
                {...register('delivery')}
                type='radio'
                id='pickup'
                value={`pickup`}
              />
              <label htmlFor='pickup' className='ml-3 font-semibold'>
                Pick up on the spot
              </label>
            </div>
            {errors.delivery && (
              <p className='text-red-600 my-3 '>{errors.delivery.message}</p>
            )}

            <div>
              <label htmlFor='notes'>
                <span className='text-sm md:text-base font-bold mt-5'>
                  Notes
                </span>
                <textarea
                  {...register('notes')}
                  id='notes'
                  className='block my-3 w-full h-24 p-3 text-md resize-none border border-primary-blue rounded-md outline-none focus:ring-2 focus:ring-primary-blue'
                  placeholder='Place your notes here...'
                ></textarea>
              </label>
            </div>
            {errors.notes && (
              <p className='text-red-600 my-3 '>{errors.notes.message}</p>
            )}

            <div>
              <p className='text-sm md:text-base font-bold'>Payment Method</p>
              <Image
                src={'/images/payment/qris.png'}
                alt='QRIS'
                width={0}
                height={0}
                sizes='100vw'
                priority={true}
                className='size-full aspect-square my-3 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
            <div>
              <label htmlFor='payment_proof'>
                <span className='text-sm md:text-base font-bold'>
                  Payment Proof
                </span>
                <input
                  {...register('payment_proof')}
                  type='file'
                  id='Payment_proof'
                  className='w-full border text-slate-500 border-primary-blue rounded-md p-2 mt-3 focus:outline-none focus:ring-2 focus:ring-primary-blue file:bg-slate-200 file:px-3 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-secondary-blue hover:file:bg-primary-blue/10 transition-all ease-in-out cursor-pointer'
                />
              </label>
            </div>
            {errors.payment_proof && (
              <p className='text-red-600 my-3 '>
                {typeof errors.payment_proof.message === 'string' &&
                  errors.payment_proof.message}
              </p>
            )}

            <button
              type='submit'
              className='w-full flex items-center justify-center gap-x-3 bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow text-white py-3 mt-5 rounded-full cursor-pointer transition-all ease-in-out'
            >
              <ScanLine />
              <span className='font-bold'>Checkout</span>
            </button>
          </section>
        </form>
      </div>
    </section>
  )
}

export default PaymentForm
