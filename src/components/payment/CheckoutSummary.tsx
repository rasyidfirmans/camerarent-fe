'use client'

import React from 'react'
import { ApiResponseCart } from '../cart/CartBody'
import CartSection from '../cart/CartSection'

const CheckoutSummary = ({
  data,
  setCartData,
}: {
  data: ApiResponseCart
  setCartData: React.Dispatch<React.SetStateAction<ApiResponseCart>>
}) => {
  return (
    <>
      <section className='w-full sm:w-[85%] md:w-[75%] lg:w-[60%]'>
        <CartSection
          label={`Checkout Summary`}
          style='w-full h-[30rem] sm:h-[36rem] lg:h-[calc(100vh-10rem)] p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg'
          data={data}
          setCartData={setCartData}
        />
      </section>
    </>
  )
}

export default CheckoutSummary
