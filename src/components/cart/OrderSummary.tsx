import { MoveRight } from 'lucide-react'
import { ApiResponseCart } from './CartBody'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type OrderSummaryProps = {
  data: ApiResponseCart
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { data } = props
  const router = useRouter()

  const checkoutValidation = () => {
    if (data?.data.length === 0) {
      toast.error(
        'Your cart is empty. Please add items to your cart before checking out.'
      )
    } else {
      router.push('/payment')
      toast.info('Please check your cart before proceeding to payment.')
    }
  }

  return (
    <section className='w-full sm:w-3/4 lg:w-2/5 p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg'>
      <div className='relative w-full h-full overflow-y-auto flex flex-col bg-white rounded-xl p-5'>
        <p className='text-lg font-bold sticky top-0 bg-white pb-3'>
          Order Summary
        </p>
        <div className=''>
          <div className='flex justify-between'>
            <p className='text-sm md:text-base'>Subtotal</p>
            <p className='text-sm md:text-base font-bold'>
              {data?.total_price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className='flex justify-between mt-3'>
            <p className='text-sm md:text-base'>Discount</p>
            <p className='text-red-600 text-sm md:text-base font-bold'>
              {Number(0).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className='w-full h-0.5 bg-slate-300 mt-5'></div>
        <div>
          <div className='flex justify-between mt-5 font-bold'>
            <p className='text-sm md:text-base'>Total</p>
            <p className='text-sm md:text-base'>
              {data?.total_price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <button
            className='w-full flex itmes-center justify-center gap-x-3 bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow text-white py-3 mt-3 rounded-full cursor-pointer trasnsition-all ease-in-out'
            onClick={checkoutValidation}
          >
            <span className='font-bold'>Checkout</span>
            <MoveRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderSummary
