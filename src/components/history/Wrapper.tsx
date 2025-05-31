import Header from './Header'
import HistoryTable from './HistoryTable'

const Wrapper = () => {
  return (
    <>
      <section className='w-full h-full bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-300'>
        <div className='w-full h-full flex flex-col gap-10 bg-white rounded-xl p-5'>
          <Header />
          <div className='w-full h-full overflow-x-auto'>
            <HistoryTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default Wrapper
