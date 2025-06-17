'use client'

import React from 'react'
import Image from 'next/image'
import Button from '../../Button'
import { Trash2, SquarePen } from 'lucide-react'
import { useProducts } from '@/context/ProductsContext'
import { toast } from 'sonner'

const ProductTable = () => {
  const { productsApiResponse, isError } = useProducts()
  if (isError) {
    toast.error(
      'Failed to fetch products. Please try again later or contact support.'
    )
  }
  return (
    <table className='w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full table-fixed border-collapse rounded-xl'>
      <thead className='bg-gray-200 sticky top-0 z-10'>
        <tr className='w-full flex items-start p-3 md:p-5 text-left'>
          <th className='w-[35%]'>Product</th>
          <th className='w-[15%]'>Category</th>
          <th className='w-[15%]'>Price</th>
          <th className='w-[15%]'>Stock</th>
          <th className='w-[20%] text-center'>Action</th>
        </tr>
      </thead>
      <tbody>
        {!isError &&
          productsApiResponse?.data.map((data, index) => (
            <React.Fragment key={index}>
              <tr className='flex items-center w-full px-3 py-1 md:px-5 md:py-3'>
                <td className='w-[35%]'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={`http://laravel.local/${data.image}`}
                      alt={data.name}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div>
                      <h3 className='font-semibold text-base md:text-lg'>
                        {data.name}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className='w-[15%]'>{data.category}</td>
                <td className='w-[15%]'>
                  {Number(data.price).toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={`w-[15%] font-semibold ${
                    data.stock === 0 ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {data.stock}
                </td>
                <td className='w-[20%]'>
                  <div className='flex rounded items-center justify-center'>
                    <Button
                      type='button'
                      onClick={() => {}}
                      variant='flex w-1/2 item-center justify-center bg-yellow-400 rounded-l-lg hover:bg-yellow-500 text-white gap-2 p-2'
                    >
                      <SquarePen />
                      <p>Edit</p>
                    </Button>
                    <Button
                      type='button'
                      onClick={() => {}}
                      variant='flex w-1/2 item-center justify-center bg-red-400 rounded-r-lg hover:bg-red-500 text-white gap-2 p-2'
                    >
                      <Trash2 />
                      <p>Delete</p>
                    </Button>
                  </div>
                </td>
              </tr>
              {productsApiResponse.data.length - 1 !== index && (
                <tr className='block w-full h-0.25 sm:h-0.5 bg-slate-200'></tr>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </table>
  )
}

export default ProductTable
