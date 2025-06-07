'use client'

import ProductDetailsSection from '@/components/product_details/ProductDetailsSection'
import RentDetails from '@/components/product_details/RentDetails'
import { api } from '@/lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

type ApiResponse = {
  status: number
  message: string
  data: {
    id: number
    name: string
    category: string
    description: string
    image: string
    price: string
    stock: number
  }
}

const ProductPage = () => {
  const productId = useParams<{ id: string }>()
  // const queryClient = useQueryClient()
  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useQuery<ApiResponse>({
    queryKey: ['detail_product', productId.id],
    queryFn: () =>
      api.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId.id}`
      ),
    enabled: !!productId.id,
  })

  if (isError) {
    console.error(error)
    toast.error('Upss! Something went wrong')
  }

  return (
    <main className='mt-20 h-fit lg:h-[calc(100vh-80px)] pt-10 pb-14 w-full px-5 md:px-16 flex flex-col gap-y-5 lg:flex-row lg:gap-x-5'>
      {!isLoading && !isError && product && (
        <>
          <ProductDetailsSection product={product.data} />
          <RentDetails
            product={{ product_id: product.data.id, price: product.data.price }}
          />
        </>
      )}
    </main>
  )
}

export default ProductPage
