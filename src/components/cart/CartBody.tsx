import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CartSection from './CartSection'
import OrderSummary from './OrderSummary'

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

  useEffect(() => {
    if (data) {
      setCartData(data)
    }
  }, [data])

  return (
    <>
      <section className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-y-5 lg:gap-x-8 lg:max-w-[90%] xl:max-w-[80%] mx-auto px-5 md:px-16 mt-32 mb-16'>
        <CartSection
          data={cartData}
          setCartData={setCartData}
          // total_price={data?.total_price ?? 0}
        />
        <OrderSummary data={cartData} />
      </section>
    </>
  )
}

export default CartBody
