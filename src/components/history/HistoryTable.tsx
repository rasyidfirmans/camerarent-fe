'use client'

import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'

type ApiResponseTransaction = {
  id: number
  user_id: number
  validated_by: string | null
  delivery: string
  notes: string | null
  payment_proof: string
  status: string
  invoice_id: string
  total_price: number
  created_at: string
  updated_at: string
  products: {
    id: number
    name: string
    description: string
    category_name: string
    price: string
    stock: number
    image: string
    quantity: string
    start_date: string
    end_date: string
    subtotal: number
    created_at: string
    updated_at: string
  }[]
}[]

const HistoryTable = () => {
  const historyQuery = async () => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = api.get<ApiResponseTransaction>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res
    } catch (error) {
      console.error('Error fetching transaction history:', error)
      throw error
    }
  }

  const {
    isLoading,
    isError,
    error,
    data: transactions,
  } = useQuery<ApiResponseTransaction>({
    queryKey: ['get_transaction_history'],
    queryFn: historyQuery,
  })

  if (isError) {
    console.error('Error fetching transaction history:', error)
    toast.error('System Error', {
      description:
        'Oops! Something went wrong while displaying your transaction history',
    })
  }

  return (
    <table className='w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full h-[85%] text-left text-sm md:text-base table-auto min-w-max border-collapse rounded-xl'>
      <thead className='w-full block rounded-t-xl bg-primary-blue/5'>
        <tr className='w-full flex items-start p-3 md:p-5'>
          <th className='w-[30%]'>Product</th>
          <th className='w-[15%]'>Date</th>
          <th className='w-[20%]'>Invoice ID</th>
          <th className='w-[15%]'>Total</th>
          <th className='w-[10%]'>Status</th>
          <th className='w-[10%] text-right'>Action</th>
        </tr>
      </thead>
      <tbody className='block h-full overflow-y-auto'>
        {!isLoading &&
          !isError &&
          transactions &&
          transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <tr className='flex items-center w-full px-3 py-1 md:px-5 md:py-3'>
                <td className='w-[30%]'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={`http://laravel.local/${transaction.products[0].image}`}
                      alt={transaction.products[0].name}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div>
                      <h3 className='font-semibold text-base md:text-lg'>
                        {transaction.products[0].name}
                      </h3>
                      <p className='text-xs md:text-sm text-slate-500'>
                        {transaction.products.length > 1
                          ? 'and ' + (transaction.products.length - 1) + ' more'
                          : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='w-[15%]'>{transaction.created_at}</td>
                <td className='w-[20%]'>{transaction.invoice_id}</td>
                <td className='w-[15%]'>
                  {transaction.total_price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={`w-[10%] font-semibold ${
                    transaction.status.toLowerCase() === 'success'
                      ? 'text-green-600'
                      : transaction.status.toLowerCase() === 'pending'
                      ? 'text-yellow-600'
                      : transaction.status.toLowerCase() === 'rejected'
                      ? 'text-red-600'
                      : ''
                  }`}
                >
                  {transaction.status}
                </td>
                <td className='w-[10%] text-right'>
                  <button className='text-white bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out'>
                    Details
                  </button>
                </td>
              </tr>
              {transactions.length - 1 !== index && (
                <tr className='block w-full h-0.25 sm:h-0.5 bg-slate-200'></tr>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </table>
  )
}

export default HistoryTable
