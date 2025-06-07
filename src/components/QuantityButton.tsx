'use client'

import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useMutation } from '@tanstack/react-query'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

type QuantityButtonProps = {
  id: number
  itemQuantity: number
  onIncrement: (id: number, quantity: number) => void
  onDecrement: (id: number, quantity: number) => void
}

const QuantityButton = (props: QuantityButtonProps) => {
  const { id, itemQuantity, onIncrement, onDecrement } = props
  const [quantity, setQuantity] = useState(itemQuantity || 1)
  const cartUpdateMutation = async () => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            id: id,
            quantity: quantity,
          },
        }
      )

      return res
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw new Error('Failed to add to cart')
    }
  }
  const cartDeleteMutation = async () => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            id: id,
          },
        }
      )

      return res
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw new Error('Failed to add to cart')
    }
  }
  const mutationUpdate = useMutation({
    mutationFn: cartUpdateMutation,
  })
  const mutationDelete = useMutation({
    mutationFn: cartDeleteMutation,
  })

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
    onIncrement(id, quantity + 1)
    mutationUpdate.mutate()
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
      onDecrement(id, quantity - 1)
      mutationUpdate.mutate()
    } else {
      onDecrement(id, 0)
      mutationDelete.mutate()
    }
  }

  return (
    <>
      <div className='h-full sm:h-auto sm:w-24 md:max-w-28 flex flex-col-reverse sm:flex-row sm:shrink justify-between items-center sm:items-center sm:justify-center gap-x-4 bg-gray-200 rounded-full p-2'>
        <Minus className='cursor-pointer size-4' onClick={handleDecrement} />
        <span className='text-sm font-semibold select-none'>{quantity}</span>
        <Plus className='cursor-pointer size-4' onClick={handleIncrement} />
      </div>
    </>
  )
}

export default QuantityButton
