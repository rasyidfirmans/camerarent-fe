import Image from 'next/image'
import ProductDetails from './ProductDetails'

const ProductDetailsSection = () => {
  return (
    <section className='w-full lg:w-1/2 xl:w-2/3 h-full flex flex-col gap-y-5 xl:flex-row xl:gap-x-5 border border-slate-300 bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-xl'>
      <div className='w-full h-fit xl:h-full xl:w-3/5 rounded-xl bg-white border border-slate-300 overflow-hidden flex justify-center items-center'>
        <Image
          src='/images/product_details/dummy_camera.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='size-[70%] sm:size-[60%] md:size-[50%] lg:w-full lg:h-[80%] xl:w-[80%] aspect-square object-contain rounded-xl'
        />
      </div>
      <ProductDetails />
    </section>
  )
}

export default ProductDetailsSection
