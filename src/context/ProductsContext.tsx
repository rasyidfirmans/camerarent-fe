'use client'

import { ProductsApiResponse } from '@/app/dashboard/products/page'
import { api } from '@/lib/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { createContext, FC, useContext } from 'react'

type ProductsContextValue = {
  productsApiResponse?: ProductsApiResponse
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetchProducts: () => void
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
)

export const ProductsContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fetchProductsData = async (): Promise<ProductsApiResponse> => {
    try {
      const res = await api.get<ProductsApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      return res
    } catch (error) {
      console.error('Error fetching products in context:', error)
      throw error
    }
  }

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<ProductsApiResponse, Error> = useQuery<
    ProductsApiResponse,
    Error
  >({
    queryKey: ['get_products'],
    queryFn: fetchProductsData,
  })

  const contextValue: ProductsContextValue = {
    productsApiResponse: apiResponse,
    isLoading,
    isError,
    error: error || null,
    refetchProducts: refetch,
  }

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = (): ProductsContextValue => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsContextProvider'
    )
  }
  return context
}
