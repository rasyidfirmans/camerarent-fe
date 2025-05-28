import { apiFetch } from '@/lib/apiClient'
import React from 'react'
import { useEffect } from 'react'
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

  const apiResponse = async () => {
    return await apiFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
  }

  useEffect(() => {
    const fetchedProducts = async () => {
      const res = await apiResponse()
      const products = apiResponseSchema.safeParse(res)

      if (products.success) {
        setProducts(products.data.data)
      } else {
        console.error('Error fetching products:', products.error)
      }
    }

    fetchedProducts()
  }, [])

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
