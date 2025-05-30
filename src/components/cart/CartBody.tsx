import CartSection from './CartSection'
import OrderSummary from './OrderSummary'

const CartBody = () => {
  return (
    <>
      <section className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-y-5 lg:gap-x-8 lg:max-w-[90%] xl:max-w-[80%] mx-auto px-5 md:px-16 mt-32 mb-16'>
        <CartSection />
        <OrderSummary />
      </section>
    </>
  )
}

export default CartBody
