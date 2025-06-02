import { Package, Shapes } from 'lucide-react'
import React from 'react'

type ProductDetailProps = {
  product: {
    name: string
    category: string
    description: string
    price: string
    stock: number
  }
}

const ProductDetails = (props: ProductDetailProps) => {
  const { product } = props
  return (
    <React.Fragment>
      <section className='w-full xl:w-2/5 overflow-y-auto h-full p-3'>
        <div>
          <h1 className='text-2xl md:text-3xl lg:text-2xl xl:text-4xl font-bold text-secondary-blue'>
            {product.name}
          </h1>
          <p className='text-base md:text-lg xl:text-xl text-primary-yellow font-bold mt-2'>
            {Number(product.price).toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
            {`/day`}
          </p>
        </div>
        <div className='mb-8'>
          <p className='text-secondary-blue font-semibold mt-5'>Details</p>
          <div className='w-full h-0.5 bg-slate-200 my-2'></div>
          <div className='flex flex-col gap-y-3 text-slate-600 text-md'>
            <div className='flex items-center gap-x-3'>
              <Package />
              <span>Stock: {product.stock}</span>
            </div>
            <div className='flex items-center gap-x-3'>
              <Shapes />
              <span>Category: {product.category}</span>
            </div>
            {/* <div className='flex items-center gap-x-3'>
              <BadgeDollarSign />
              <span>
                Price:{' '}
                {Number(100000).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
                {'/day'}
              </span>
            </div> */}
          </div>
        </div>
        <div>
          <p className='text-secondary-blue font-semibold mt-5'>Description</p>
          <div className='w-full h-0.5 bg-slate-200 my-2'></div>
          <p className='text-slate-600 text-md'>{product.description}</p>
        </div>
      </section>
    </React.Fragment>
  )
}

export default ProductDetails
