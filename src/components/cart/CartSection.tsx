import { Calendar } from 'lucide-react'
import CartItem from './CartItem'

const CartSection = () => {
  return (
    <section className='w-full sm:w-3/4 lg:w-3/5 h-[75vh] lg:h-screen p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg'>
      <div className='relative w-full h-full overflow-y-auto flex flex-col gap-y-3 bg-white rounded-xl px-2 pb-2 sm:px-5 sm:pb-5'>
        <p className='w-[calc(100%+1rem)] sm:w-[calc(100%+2.5rem)] bg-white rounded-b-xl font-bold sticky top-0 pt-5 pb-3 px-5 text-lg -mx-2 sm:-mx-5'>
          Your Cart
        </p>
        <div className='w-full flex flex-col gap-y-8'>
          <div className='w-full flex flex-col gap-y-3'>
            <div className='w-full flex items-center gap-x-2'>
              <Calendar className='text-secondary-blue size-6' />
              <span className='text-sm md:text-md text-secondary-blue font-semibold'>
                12/05/2025 to 16/05/2025
              </span>
            </div>
            <div className='w-full flex flex-col gap-y-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <CartItem key={index} />
              ))}
            </div>
          </div>
          <div className='w-full flex flex-col gap-y-3'>
            <div className='w-full flex items-center gap-x-2'>
              <Calendar className='text-secondary-blue size-6' />
              <span className='text-sm md:text-md text-secondary-blue font-semibold'>
                11/05/2025 to 12/05/2025
              </span>
            </div>
            <div className='w-full flex flex-col gap-y-3'>
              {Array.from({ length: 2 }).map((_, index) => (
                <CartItem key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartSection
