const transactionStep = [
  {
    label: 'Rental Cart',
  },
  {
    label: 'Checkout Details',
  },
  {
    label: 'Order Complete',
  },
]

type CartHeaderProps = {
  activeStep: number
  setActiveStep: (step: number) => void
}

const CartHeader = (props: CartHeaderProps) => {
  const { activeStep, setActiveStep } = props
  return (
    <>
      <section className='w-full flex flex-col justify-center items-center'>
        <div>
          <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            Your Rental Cart
          </h1>
        </div>
        <div className='mt-16 max-w-md sm:max-w-lg md:max-w-xl flex gap-x-10'>
          {transactionStep.map((transaction, index) => (
            <div
              key={index}
              className={`relative flex items-center gap-x-2 w-52 transition-all cursor-pointer ${
                activeStep === index ? 'pb-5' : 'pb-8'
              }`}
              onClick={() => {
                setActiveStep(index)
              }}
            >
              <span
                className={`block size-10 transition-all ${
                  activeStep === index ? 'bg-primary-yellow' : 'bg-gray-400'
                } rounded-xl text-white font-bold text-center`}
              >
                {index + 1}
              </span>
              <p
                className={`font-semibold transition-all ${
                  activeStep === index
                    ? 'text-primary-bg-primary-yellow'
                    : 'text-gray-400'
                }`}
              >
                {transaction.label}
              </p>
              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 transition-all duration-500 ${
                  activeStep === index
                    ? 'bg-primary-yellow scale-x-100'
                    : 'bg-transparent scale-x-0'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CartHeader
