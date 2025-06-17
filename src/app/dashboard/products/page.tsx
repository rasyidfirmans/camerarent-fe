import Wrapper from '@/components/dashboard/products/Wrapper'
import { ProductsContextProvider } from '@/context/ProductsContext'

export type ProductsApiResponse = {
  status: string
  message: string
  data: {
    id: number
    name: string
    description: string
    price: string
    stock: number
    image: string
    category: string
  }[]
}

const HistoryPage = () => {
  return (
    <ProductsContextProvider>
      <main className='mt-32 mb-16 w-full h-fit px-5 md:px-16'>
        <Wrapper />
      </main>
    </ProductsContextProvider>
  )
}

export default HistoryPage
