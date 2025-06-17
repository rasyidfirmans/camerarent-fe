'use client'

import CartBody from '@/components/cart/CartBody'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const CartPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const errorType = searchParams.get('error')
    if (errorType) {
      switch (errorType) {
        case 'empty_cart_payment_attempt':
          console.log('Empty cart payment attempt detected')
          toast.error(
            'Your cart is empty. Please add items to your cart before proceeding to payment.'
          )
          break
        case 'cart_fetch_failed':
          toast.error('Failed to fetch cart data. Please try again later.')
          break
        default:
          toast.error('An unknown error occurred. Please try again.')
      }

      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete('error')
      const queryString = newSearchParams.toString()
      const newUrl = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.replace(newUrl, { scroll: false })
    }
  }, [pathname, router, searchParams])

  return (
    <main className='mt-20 min-h-[100dvh]'>
      <CartBody />
    </main>
  )
}

export default CartPage
