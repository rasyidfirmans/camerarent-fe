'use client'

import { ApiResponseCart } from '@/components/cart/CartBody'
import CheckoutSummary from '@/components/payment/CheckoutSummary'
import PaymentForm from '@/components/payment/PaymentForm'
import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const PaymentPage = () => {
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
    if (!isLoading && !isError && data) {
      setCartData(data)
    } else {
      console.log(error)
    }
  }, [data, isLoading, isError, error])

  return (
    <main className='mt-28 mb-16 px-5 sm:px-16 lg:max-h-screen w-screen lg:max-w-[95%] xl:max-w-[80%] mx-auto'>
      <section className='flex flex-col justify-center items-start lg:flex-row w-full gap-4'>
        <CheckoutSummary data={cartData} setCartData={setCartData} />
        <PaymentForm
          label={`Payment Form`}
          style='w-full sm:w-[85%] md:w-[75%] lg:w-[40%] h-[30rem] lg:h-[calc(100vh-10rem)] p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg'
          data={cartData}
        />
      </section>
    </main>
  )
}

export default PaymentPage
