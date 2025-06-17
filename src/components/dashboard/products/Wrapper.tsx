import Header from './Header'
import ProductTable from './ProductTable'

const Wrapper = () => {
  return (
    <>
      <section className='w-full min-h-screen bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-300'>
        <div className='w-full flex flex-col gap-10 bg-white rounded-xl p-5'>
          <Header />
          <div className='relative overflow-y-auto h-[70vh] rounded-xl border'>
            <ProductTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default Wrapper
