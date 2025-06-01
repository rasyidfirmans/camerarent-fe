'use client'

import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useRef, useState } from 'react'

const RentDetails = () => {
  const [quantity, setQuantity] = useState<number>(1)
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)
  const rentPeriodRef = useRef<HTMLParagraphElement>(null)
  const subTotalRef = useRef<HTMLParagraphElement>(null)
  const incButton = useRef<SVGSVGElement>(null)
  const decButton = useRef<SVGSVGElement>(null)

  console.log(quantity)

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const currQuantity = prevQuantity - 1
        calculateSubTotal(100000, currQuantity)
        return currQuantity
      })
    }
  }

  const increment = () => {
    setQuantity((prevQuantity) => {
      const currQuantity = prevQuantity + 1
      calculateSubTotal(100000, currQuantity)
      return currQuantity
    })
  }

  const calculateRentPeriod = () => {
    const startDate = startDateRef.current?.value
    const endDate = endDateRef.current?.value

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (start <= end) {
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (rentPeriodRef.current) {
          if (diffDays > 1) {
            rentPeriodRef.current.innerHTML = diffDays
              .toString()
              .concat(' days')
          } else {
            rentPeriodRef.current.innerHTML = diffDays.toString().concat(' day')
          }
        }

        return diffDays
      }
    }
  }

  const calculateSubTotal = (price: number, quantity: number) => {
    const diffDays = calculateRentPeriod()

    if (diffDays) {
      const subTotal = price * quantity * diffDays
      if (subTotalRef.current) {
        console.log('inner sub total func: ', quantity)
        subTotalRef.current.innerHTML = subTotal.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })
      }
    }
  }

  return (
    <section className='w-1/3 h-full bg-white/20 backdrop-blur-md rounded-xl border border-slate-300 p-5 shadow-xl'>
      <div className='w-full h-full p-3 overflow-y-auto'>
        <h1 className='font-bold text-secondary-blue text-2xl'>Rent Details</h1>
        <div className='w-full h-0.5 bg-slate-200 my-2'></div>
        <form action='' className='flex flex-col gap-y-5'>
          <label htmlFor='start_date'>
            <span className='font-bold'>Start Date</span>
            <input
              ref={startDateRef}
              type='datetime-local'
              name='start_date'
              id='start_date'
              className='block mt-3 w-full text-slate-600 border border-slate-400 px-5 py-3 rounded-xl focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
              onChange={() => {
                calculateRentPeriod()
                calculateSubTotal(100000, quantity)
              }}
            />
          </label>
          <label htmlFor='end_date'>
            <span className='font-bold'>End Date</span>
            <input
              ref={endDateRef}
              type='datetime-local'
              name='end_date'
              id='end_date'
              className='block mt-3 w-full text-slate-600 border border-slate-400 px-5 py-3 rounded-xl focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
              onChange={() => {
                calculateRentPeriod()
                calculateSubTotal(100000, quantity)
              }}
            />
          </label>
          <div className='w-full flex justify-between items-center'>
            <p className='font-bold'>Quantity</p>
            <div className='w-36 flex itmes-center gap-x-5 bg-secondary-yellow/20 rounded-lg p-2'>
              <Minus
                ref={decButton}
                onClick={() => {
                  decrement()
                }}
                className='size-8 rounded-lg font-bold bg-primary-blue hover:bg-secondary-blue text-white p-2 cursor-pointer'
              />
              <p className='flex-1 select-none align-bottom text-center'>
                {quantity}
              </p>
              <Plus
                ref={incButton}
                onClick={() => {
                  increment()
                }}
                className='size-8 rounded-lg font-bold bg-primary-blue hover:bg-secondary-blue text-white p-2 cursor-pointer'
              />
            </div>
          </div>

          <div className='flex flex-col gap-y-3'>
            <div className='w-full flex items-center justify-between'>
              <p>Rent Period</p>
              <p ref={rentPeriodRef} className='font-bold'></p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p>Price</p>
              <p className='font-bold'>
                {Number(100000).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p>Discount</p>
              <p className='font-bold'>
                {Number(0).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p className='font-bold'>Sub Total</p>
              <p ref={subTotalRef} className='font-bold'></p>
            </div>
          </div>

          <button
            type='submit'
            className='w-full flex items-center justify-center bg-secondary-yellow hover:bg-primary-yellow py-5 font-bold rounded-xl gap-x-3'
          >
            <ShoppingCart />
            <span>Add to Cart</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default RentDetails
