import { BadgeDollarSign, Package, Shapes } from 'lucide-react'
import React from 'react'

const ProductDetails = () => {
  return (
    <React.Fragment>
      <section className='w-2/5 overflow-y-auto h-full p-3'>
        <div>
          <h1 className='text-4xl font-bold text-secondary-blue'>
            Sample Product
          </h1>
          {/* <p className='text-xl text-primary-yellow font-bold mt-2'>
            {Number(100000).toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
            {`/day`}
          </p> */}
        </div>
        <div className='mb-8'>
          <p className='text-secondary-blue font-semibold mt-5'>Details</p>
          <div className='w-full h-0.5 bg-slate-200 my-2'></div>
          <div className='flex flex-col gap-y-3 text-slate-600 text-md'>
            <div className='flex items-center gap-x-3'>
              <Package />
              <span>Stock: 10</span>
            </div>
            <div className='flex items-center gap-x-3'>
              <Shapes />
              <span>Category: Camera</span>
            </div>
            <div className='flex items-center gap-x-3'>
              <BadgeDollarSign />
              <span>
                Price:{' '}
                {Number(100000).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
                {'/day'}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className='text-secondary-blue font-semibold mt-5'>Description</p>
          <div className='w-full h-0.5 bg-slate-200 my-2'></div>
          <p className='text-slate-600 text-md'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            consequatur beatae voluptatem incidunt, asperiores, porro nobis a,
            quia quam labore eligendi! Labore exercitationem earum sit
            perferendis dolore deserunt esse debitis. Hic iste tempore quis
            dicta minima placeat recusandae sed in voluptas molestiae delectus
            consequatur distinctio, neque alias debitis ullam deserunt esse
            quidem dolore non impedit cumque quas? Sit, nulla praesentium.
            Saepe, nostrum consequuntur! Molestias consequuntur error
            praesentium quae alias, labore repellat porro! Numquam laborum
            eveniet cumque odio. A, ullam perferendis? Aspernatur voluptatum
            accusantium molestiae at veritatis in consequatur sunt consectetur?
          </p>
        </div>
      </section>
    </React.Fragment>
  )
}

export default ProductDetails
