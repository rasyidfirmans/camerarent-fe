'use client'

import Wrapper from '@/components/dashboard/orders/Wrapper'
import { OrdersContextProvider } from '@/context/OrdersContext'

export type OrdersApiResponse = {
  code: number
  message: string
  data: {
    id: number
    user_id: number
    validated_by: number
    delivery: string
    notes: string
    payment_proof: string
    status: string
    invoice_id: string
    created_at: string
    updated_at: string
    total_price: number
    user: {
      name: string
      email: string
      phone_number: string
    }
    products: {
      id: number
      name: string
      description: string
      price: string
      stock: number
      image: string
      category: string
      quantity: string
      start_date: string
      end_date: string
      sub_total: number
    }[]
  }[]
}

const HistoryPage = () => {
  return (
    <OrdersContextProvider>
      <main className='mt-32 mb-16 w-full h-fit px-5 md:px-16'>
        <Wrapper />
      </main>
    </OrdersContextProvider>
  )
}

export default HistoryPage
