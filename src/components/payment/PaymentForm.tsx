import { ScanLine } from 'lucide-react'
import Image from 'next/image'
import { ApiResponseCart } from '../cart/CartBody'

type PaymentFormProps = {
  label: string
  style?: string
  data: ApiResponseCart
}

const PaymentForm = (props: PaymentFormProps) => {
  const { label, style, data } = props
  return (
    <section className={`${style} `}>
      <div className='w-full h-full bg-white rounded-xl p-5 overflow-y-auto'>
        <p className='text-lg font-bold pb-3'>{label}</p>
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
        </div>
        <div className='w-full h-0.5 bg-slate-300 mt-5'></div>
        <form action=''>
          <section>
            <p className='text-sm md:text-base font-bold mt-5'>Delivery</p>
            <div className='my-3'>
              <input
                type='radio'
                name='delivery'
                id='pickup'
                value={`pickup`}
              />
              <label htmlFor='pickup' className='ml-3 font-semibold'>
                Pick up on the spot
              </label>
            </div>
            <div>
              <label htmlFor='notes'>
                <span className='text-sm md:text-base font-bold mt-5'>
                  Notes
                </span>
                <textarea
                  name='notes'
                  id='notes'
                  className='block my-3 w-full h-24 p-3 text-md resize-none border border-primary-blue rounded-md outline-none focus:ring-2 focus:ring-primary-blue'
                  placeholder='Place your notes here...'
                ></textarea>
              </label>
            </div>
            <div>
              <p className='text-sm md:text-base font-bold'>Payment Method</p>
              <Image
                src={'/images/payment/qris.png'}
                alt='QRIS'
                width={0}
                height={0}
                sizes='100vw'
                priority={true}
                className='size-full aspect-square my-3 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
            <div>
              <label htmlFor='payment_proof'>
                <span className='text-sm md:text-base font-bold'>
                  Payment Proof
                </span>
                <input
                  type='file'
                  name='payment_proof'
                  id='Payment_proof'
                  className='w-full border text-slate-500 border-primary-blue rounded-md p-2 mt-3 focus:outline-none focus:ring-2 focus:ring-primary-blue file:bg-slate-200 file:px-3 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-secondary-blue hover:file:bg-primary-blue/10 transition-all ease-in-out cursor-pointer'
                />
              </label>
            </div>
            <button
              type='submit'
              className='w-full flex items-center justify-center gap-x-3 bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow text-white py-3 mt-5 rounded-full cursor-pointer transition-all ease-in-out'
            >
              <ScanLine />
              <span className='font-bold'>Checkout</span>
            </button>
          </section>
        </form>
      </div>
    </section>
  )
}

export default PaymentForm
