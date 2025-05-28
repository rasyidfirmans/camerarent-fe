import { useEffect, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import FilterSection from './FilterSection'
import ProductWrapper from './ProductsWrapper'

const Main = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const hideFilterSection = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return <main className='w-screen h-screen'></main>

  return (
    <div className='mt-20 py-5 flex items-start'>
      {!hideFilterSection && <FilterSection />}
      <ProductWrapper />
    </div>
  )
}

export default Main
