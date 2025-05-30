import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import QuantityButton from '../QuantityButton'

const CartItem = () => {
  return (
    <div className='w-full h-[10rem] flex items-stretch bg-white p-3 rounded-xl border-b border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'>
      <div className='flex-1 h-full aspect-square rounded-md bg-slate-200 flex justify-center items-center'>
        <Image
          src='http://laravel.local/storage/images/products/Nikon%20Z50II.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='size-12 rounded-md'
        />
      </div>
      <div className='flex-4 mx-5 flex flex-col justify-between h-full'>
        <div>
          <h3 className='font-bold text-md sm:text-xl overflow-ellipsis'>
            Camera Canon
          </h3>
          <p className='text-sm sm:text-md'>Notes: </p>
        </div>
        <p className='text-sm sm:text-md font-bold'>
          {Number(1000000).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className='flex-1 flex flex-col items-end justify-between h-full'>
        <Trash2 className='text-red-600 size-6 cursor-pointer' />
        <QuantityButton />
      </div>
    </div>
  )
}

export default CartItem
