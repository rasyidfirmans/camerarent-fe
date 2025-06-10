import { api } from '@/lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { z } from 'zod'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductSkeleton'

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.string(),
  stock: z.number(),
})

const apiResponseSchema = z.object({
  data: z.array(productSchema),
  message: z.string(),
  status: z.boolean(),
})

export type productType = z.infer<typeof productSchema>

const ProductWrapper = () => {
  const [products, setProducts] = React.useState<productType[] | null>(null)

  const productQuery = () => {
    try {
      const res = api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        headers: {
          Accept: 'application/json',
        },
      })
      return res
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: productQuery,
  })

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const parsedData = apiResponseSchema.safeParse(data)
      if (parsedData.success) {
        setProducts(parsedData.data.data)
      } else {
        console.error('Invalid data format:', parsedData.error)
      }
    }
  }, [data, isLoading, isError, error])

  return (
    <div className='w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 px-5'>
      {products
        ? products.map((product: productType, index) => (
            <ProductCard key={index} product={product} />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
    </div>
  )
}

export default ProductWrapper
