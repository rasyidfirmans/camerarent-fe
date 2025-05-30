'use client'

import CartBody from '@/components/cart/CartBody'
import CartHeader from '@/components/cart/CartHeader'
import { useState } from 'react'

const CartPage = () => {
  // const [activeStep, setActiveStep] = useState(0)
  return (
    <main className='mt-20 min-h-[100dvh]'>
      {/* <CartHeader
        activeStep={activeStep}
        setActiveStep={(step) => {
          setActiveStep(step)
        }}
      /> */}
      <CartBody />
    </main>
  )
}

export default CartPage
