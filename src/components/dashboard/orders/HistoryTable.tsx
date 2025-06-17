import { useOrders } from '@/context/OrdersContext'
import React from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

const HistoryTable = () => {
  const { ordersApiResponse, isError } = useOrders()
  if (isError) {
    toast.error(
      'Failed to fetch products. Please try again later or contact support.'
    )
  }
  return (
    <table className='w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full table-fixed border-collapse rounded-xl'>
      <thead className='bg-gray-100 sticky top-0 z-10'>
        <tr className='w-full flex items-start p-3 md:p-5 text-left'>
          <th className='w-[25%]'>Product</th>
          <th className='w-[17%]'>Date</th>
          <th className='w-[23%]'>Invoice ID</th>
          <th className='w-[15%]'>Total</th>
          <th className='w-[10%]'>Status</th>
          <th className='w-[10%] text-center'>Action</th>
        </tr>
      </thead>
      <tbody>
        {ordersApiResponse?.data.map((data, index) => (
          <React.Fragment key={index}>
            <tr className='flex items-center w-full px-3 py-1 md:px-5 md:py-3 border-b-3 border-gray-200 last:border-0'>
              <td className='w-[25%]'>
                <div className='flex items-center gap-3'>
                  <Image
                    src={`http://laravel.local/${data.products[0].image}`}
                    alt={data.products[0].name}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-16 h-16 object-cover rounded-lg'
                  />
                  <div>
                    <h3 className='font-semibold text-base md:text-lg'>
                      {data.products[0].name}
                    </h3>
                    <p className='text-xs md:text-sm text-slate-500'>
                      {data.products.length > 1
                        ? 'and ' + (data.products.length - 1) + ' more'
                        : ''}
                    </p>
                  </div>
                </div>
              </td>
              <td className='w-[17%]'>{data.created_at}</td>
              <td className='w-[23%]'>{data.invoice_id}</td>
              <td className='w-[15%]'>
                {data.total_price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                })}
              </td>
              <td
                className={`w-[10%] font-semibold ${
                  data.status.toLowerCase() === 'accepted'
                    ? 'text-green-600'
                    : data.status.toLowerCase() === 'pending'
                    ? 'text-yellow-600'
                    : data.status.toLowerCase() === 'rejected'
                    ? 'text-red-600'
                    : ''
                }`}
              >
                {data.status}
              </td>
              <td className='w-[10%] text-right'>
                <button className='text-white bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out'>
                  Details
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default HistoryTable
