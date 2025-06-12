import { Calendar, ShoppingBag } from 'lucide-react'
import { ApiResponseCart } from './CartBody'
import CartItem from './CartItem'

export type CartSectionProps = {
  label: string
  style?: string
  data: ApiResponseCart
  setCartData: React.Dispatch<React.SetStateAction<ApiResponseCart>>
}

const CartSection = (props: CartSectionProps) => {
  const { label, style, data, setCartData } = props

  const handleDelete = (index: number) => {
    setCartData((prev) => {
      const newCart = [...prev.data]
      newCart.splice(index, 1)
      const newTotalPrice =
        prev.total_price -
        Number(prev.data[index].product.price) * prev.data[index].quantity
      return { ...prev, total_price: newTotalPrice, data: newCart }
    })
  }

  const handleAddQuantity = (id: number, quantity: number) => {
    setCartData((prev) => {
      const newCart = prev.data.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity + 1 }
        }
        return item
      })
      const newTotalPrice =
        prev.total_price +
        Number(prev.data.find((item) => item.id === id)?.product.price)
      return { ...prev, data: newCart, total_price: newTotalPrice }
    })
  }

  const handleSubstractQuantity = (id: number, quantity: number) => {
    setCartData((prev) => {
      const newCart = prev.data
        .map((item) => {
          if (item.id === id) {
            if (quantity > 1) {
              return { ...item, quantity: quantity - 1 }
            } else {
              return null
            }
          }
          return item
        })
        .filter((item) => item !== null)

      const newTotalPrice =
        prev.total_price -
        Number(prev.data.find((item) => item.id === id)?.product.price)
      return { ...prev, data: newCart, total_price: newTotalPrice }
    })
  }

  const groupCartItemsByDate = (cartItems: ApiResponseCart['data']) => {
    return cartItems.reduce(
      (groups: Record<string, ApiResponseCart['data']>, item) => {
        const dateKey = `${item.start_date} to ${item.end_date}`
        if (!groups[dateKey]) {
          groups[dateKey] = []
        }
        groups[dateKey].push(item)
        return groups
      },
      {}
    )
  }

  return (
    <section
      className={
        style ||
        `w-full sm:w-3/4 lg:w-3/5 h-[75vh] lg:h-screen p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg`
      }
    >
      <div className='relative w-full h-full overflow-y-auto flex flex-col gap-y-3 bg-white rounded-xl px-2 pb-2 sm:px-5 sm:pb-5'>
        <p className='w-[calc(100%+1rem)] sm:w-[calc(100%+2.5rem)] bg-white rounded-b-xl font-bold sticky top-0 pt-5 pb-3 px-5 text-lg -mx-2 sm:-mx-5'>
          {label || `Your Cart`}
        </p>
        {data?.data?.length > 0 && (
          <div className='w-full flex flex-col gap-y-8'>
            {Object.entries(groupCartItemsByDate(data.data)).map(
              ([dateRange, items]) => (
                <div key={dateRange} className='w-full flex flex-col gap-y-3'>
                  <div className='w-full flex items-center gap-x-2'>
                    <Calendar className='text-secondary-blue size-6' />
                    <span className='text-sm md:text-md text-secondary-blue font-semibold tracking-wide'>
                      {dateRange}
                    </span>
                  </div>
                  {items.map((item, index) => (
                    <CartItem
                      key={index}
                      data={item}
                      onDelete={() => {
                        handleDelete(index)
                      }}
                      onAddQuantity={() => {
                        handleAddQuantity(item.id, item.quantity)
                      }}
                      onSubstractQuantity={() => {
                        handleSubstractQuantity(item.id, item.quantity)
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        )}
        {data?.data?.length === 0 && (
          <div className='w-full h-full flex flex-col items-center justify-center gap-y-3'>
            <ShoppingBag className='size-16 sm:size-24 md:size-32 text-gray-300' />
            <p className='text-gray-400 text-md md:text-lg font-semibold'>
              Your cart is empty
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartSection
