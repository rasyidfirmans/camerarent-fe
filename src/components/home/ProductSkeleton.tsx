const ProductCardSkeleton = () => {
  return (
    <div className='flex flex-col w-full h-[17rem] p-4 bg-white border border-gray-200 rounded-lg shadow-md animate-pulse z-0'>
      <div className='w-full h-[60%] bg-gray-200 rounded-lg'></div>
      <div className='w-full mt-4'>
        <div className='h-4 bg-primary-blue/50 rounded-full'></div>
        <div className='mt-2 w-[50%] h-4 bg-secondary-yellow/50 rounded-full'></div>
        <div className='mt-2 h-4 bg-gray-200 rounded-full'></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
