import Image from 'next/image'
import ProductDetails from './ProductDetails'

const ProductDetailsSection = () => {
  return (
    <section className='w-2/3 h-full flex gap-x-5 border border-slate-300 bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-xl'>
      <div className='w-3/5 rounded-xl bg-white border border-slate-300 overflow-hidden flex justify-center items-center'>
        <Image
          src='/images/product_details/dummy_camera.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='w-[80%] aspect-square object-cover rounded-xl'
        />
      </div>
      <ProductDetails />
    </section>
  )
}

export default ProductDetailsSection
