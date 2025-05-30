import CheckoutSummary from '@/components/payment/CheckoutSummary'
import PaymentForm from '@/components/payment/PaymentForm'

const PaymentPage = () => {
  return (
    <main className='mt-28 mb-16 px-5 sm:px-16 lg:max-h-screen w-screen lg:max-w-[95%] xl:max-w-[80%] mx-auto'>
      <section className='flex flex-col justify-center items-center lg:flex-row w-full gap-4'>
        <CheckoutSummary />
        <PaymentForm
          label={`Payment Form`}
          style='w-full sm:w-[85%] md:w-[75%] lg:w-[40%] h-[30rem] lg:h-[calc(100vh-10rem)] p-2 sm:p-5 border border-gray-600 rounded-xl bg-primary-blue/10 backdrop-blur-xs shadow-lg'
        />
      </section>
    </main>
  )
}

export default PaymentPage
