'use client'

import ProductDetailsSection from '@/components/product_details/ProductDetailsSection'
import RentDetails from '@/components/product_details/RentDetails'

const ProductPage = () => {
  return (
    <main className='mt-20 h-fit lg:h-[calc(100vh-80px)] pt-10 pb-14 w-full px-5 md:px-16 flex flex-col gap-y-5 lg:flex-row lg:gap-x-5'>
      <ProductDetailsSection />
      <RentDetails />
    </main>
  )
}

export default ProductPage
