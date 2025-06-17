import { OrdersApiResponse } from '@/app/dashboard/orders/page' // Assuming OrdersApiResponse is correctly defined here
import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { createContext, ReactNode, FC, useContext } from 'react'

export type OrdersContextValue = {
  ordersApiResponse?: OrdersApiResponse
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetchOrders: () => void
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined)

export const OrdersContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const fetchOrdersData = async (): Promise<OrdersApiResponse> => {
    try {
      const accessToken = await getCookieAccessToken()
      const res = await api.get<OrdersApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/transaction`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )
      return res
    } catch (error) {
      console.error('Error fetching orders in context:', error)
      throw error
    }
  }

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<OrdersApiResponse, Error> = useQuery<
    OrdersApiResponse,
    Error
  >({
    queryKey: ['get_orders'],
    queryFn: fetchOrdersData,
  })

  const contextValue: OrdersContextValue = {
    ordersApiResponse: apiResponse,
    isLoading,
    isError,
    error: error || null,
    refetchOrders: refetch,
  }

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = (): OrdersContextValue => {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersContextProvider')
  }
  return context
}
