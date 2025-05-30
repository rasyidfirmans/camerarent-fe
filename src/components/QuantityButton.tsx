import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }
  return (
    <>
      <div className='h-full sm:h-auto sm:w-24 md:max-w-28 flex flex-col-reverse sm:flex-row sm:shrink justify-between items-center sm:items-center sm:justify-center gap-x-4 bg-gray-200 rounded-full p-2'>
        <Minus
          className='cursor-pointer size-4' // Adjust size using Tailwind classes
          onClick={() => {
            handleDecrement()
          }}
        />
        <span className='text-sm font-semibold select-none'>{quantity}</span>
        <Plus
          className='cursor-pointer size-4' // Adjust size using Tailwind classes
          onClick={() => {
            handleIncrement()
          }}
        />
      </div>
    </>
  )
}

export default QuantityButton
