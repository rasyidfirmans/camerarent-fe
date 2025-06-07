import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import QuantityButton from '../QuantityButton'

type CartItemProps = {
  data: {
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
      price: number | string
      stock: number
    }
  }
  onDelete: () => void
  onAddQuantity: (id: number, quantity: number) => void
  onSubstractQuantity: (id: number, quantity: number) => void
}

const CartItem = (props: CartItemProps) => {
  const { data, onDelete, onAddQuantity, onSubstractQuantity } = props

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
            id: data.id,
          },
        }
      )

      return res
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw new Error('Failed to add to cart')
    }
  }

  const mutationDelete = useMutation({
    mutationFn: cartDeleteMutation,
    onSuccess: () => {},
  })

  const handleDelete = () => {
    mutationDelete.mutate()
    onDelete()
  }

  return (
    <div className='w-full min-h-28 sm:min-h-32 flex items-center bg-white p-3 rounded-xl border-b border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'>
      <div className='h-full sm:w-auto aspect-square rounded-md bg-slate-200 flex justify-center items-center'>
        <Image
          src='http://laravel.local/storage/images/products/Nikon%20Z50II.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='size-16 sm:size-20 rounded-md'
        />
      </div>
      <div className='max-w-[50%] px-5 flex flex-col justify-between h-full shrink'>
        <div>
          <p className='font-bold text-sm sm:text-md md:text-lg truncate w-full whitespace-nowrap'>
            {data.product.name}
          </p>
          <p className='text-xs sm:text-sm text-primary-yellow font-bold  rounded-full bg-transparent border-2 border-primary-yellow w-fit px-2 mt-2'>
            {data.product.category}
          </p>
        </div>
        <p className='text-xs sm:text-sm md:text-base font-bold'>
          {Number(data.product.price).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className='flex flex-col items-end justify-between h-full flex-grow'>
        <Trash2
          className='text-red-600 size-6 cursor-pointer hidden sm:block'
          onClick={handleDelete}
        />
        <QuantityButton
          id={data.id}
          itemQuantity={data.quantity}
          onDecrement={onSubstractQuantity}
          onIncrement={onAddQuantity}
        />
      </div>
    </div>
  )
}

export default CartItem
