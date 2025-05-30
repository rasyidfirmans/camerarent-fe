import { MoveRight } from 'lucide-react'

const OrderSummary = () => {
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
              {Number(2000000).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className='flex justify-between mt-3'>
            <p className='text-sm md:text-base'>Discount</p>
            <p className='text-red-600 text-sm md:text-base font-bold'>
              {Number(100000).toLocaleString('id-ID', {
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
              {Number(1900000).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <button className='w-full flex itmes-center justify-center gap-x-3 bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow text-white py-3 mt-3 rounded-full cursor-pointer trasnsition-all ease-in-out'>
            <span className='font-bold'>Checkout</span>
            <MoveRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderSummary
