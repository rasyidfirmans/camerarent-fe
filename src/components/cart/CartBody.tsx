import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CartSection from './CartSection'
import OrderSummary from './OrderSummary'
import { toast } from 'sonner'

export type ApiResponseCart = {
  code: number
  message: string
  total_price: number
  data: Array<{
    id: number
    date_diff: number
    start_date: string
    end_date: string
    quantity: number
    product: {
      id: number
      name: string
      category: string
      description: string
      image: string
      price: string
      stock: number
    }
  }>
}

const CartBody = () => {
  const [cartData, setCartData] = useState<ApiResponseCart>(
    {} as ApiResponseCart
  )
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

  const { data, isLoading, isError, error } = useQuery<ApiResponseCart>({
    queryKey: ['get_cart'],
    queryFn: cartQuery,
  })

  if (isError) {
    console.error('Error fetching cart:', error)
    toast.error('Oops! Something went wrong', {
      description: 'We could not get your cart data. Please try again later.',
    })
  }

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCartData(data)
    }
  }, [data, isError, isLoading])

  return (
    <>
      <section className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-y-5 lg:gap-x-8 lg:max-w-[90%] xl:max-w-[80%] mx-auto px-5 md:px-16 mt-32 mb-16'>
        <CartSection
          label='Your Cart'
          data={cartData}
          setCartData={setCartData}
        />
        <OrderSummary data={cartData} />
      </section>
    </>
  )
}

export default CartBody
