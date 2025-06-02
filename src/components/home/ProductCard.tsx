'use client'

import Image from 'next/image'
import { productType } from './ProductsWrapper'
import Label from '../Label'
import React from 'react'
import Link from 'next/link'

type ProductCardProps = {
  product: productType
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props
  return (
    <React.Fragment>
      <Link href={`/product/${product.id}`}>
        <div className='flex flex-col gap-y-3 bg-white border border-primary-blue rounded-xl w-full h-[16rem] sm:h-[17rem] pb-3 shadow-md overflow-hidden cursor-pointer'>
          <div className='w-full h-[60%] bg-slate-100 flex justify-center items-center rounded-xl'>
            <Image
              src={`http://laravel.local/${product.image}`}
              alt={product.name}
              width={0}
              height={0}
              sizes='100vw'
              className='w-[85%] h-[85%] object-contain object-center'
            />
          </div>
          <div className='flex flex-col px-5'>
            <p className='text-secondary-blue font-bold text-lg sm:text-xl mb-1 text-ellipsis overflow-hidden whitespace-nowrap'>
              {product.name}
            </p>
            <Label
              name={product.category}
              variant='bg-transparent border border-yellow-600 text-sm px-2 text-yellow-600'
            />
            <p className='text-slate-600 text-sm mt-1'>
              {Number(product.price).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              })}
              /day
            </p>
          </div>
        </div>
      </Link>
    </React.Fragment>
  )
}

export default ProductCard
