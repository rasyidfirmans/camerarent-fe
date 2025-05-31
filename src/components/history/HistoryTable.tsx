import React from 'react'

const dummyData = [
  {
    product: 'Product A',
    date: '2023-10-01',
    invoiceId: 'INV12345',
    total: 1000000,
    status: {
      name: 'Accepted',
      color: 'text-green-600',
    },
  },
  {
    product: 'Product B',
    date: '2023-10-02',
    invoiceId: 'INV12346',
    total: 1000000,
    status: {
      name: 'Pending',
      color: 'text-yellow-600',
    },
  },
  {
    product: 'Product C',
    date: '2023-10-03',
    invoiceId: 'INV12347',
    total: 1000000,
    status: {
      name: 'Rejected',
      color: 'text-red-600',
    },
  },
  {
    product: 'Product D',
    date: '2023-10-04',
    invoiceId: 'INV12348',
    total: 1000000,
    status: {
      name: 'Accepted',
      color: 'text-green-600',
    },
  },
  {
    product: 'Product E',
    date: '2023-10-05',
    invoiceId: 'INV12349',
    total: 1000000,
    status: {
      name: 'Pending',
      color: 'text-yellow-600',
    },
  },
  {
    product: 'Product F',
    date: '2023-10-06',
    invoiceId: 'INV12350',
    total: 1000000,
    status: {
      name: 'Rejected',
      color: 'text-red-600',
    },
  },
  {
    product: 'Product G',
    date: '2023-10-07',
    invoiceId: 'INV12351',
    total: 1000000,
    status: {
      name: 'Accepted',
      color: 'text-green-600',
    },
  },
  {
    product: 'Product H',
    date: '2023-10-08',
    invoiceId: 'INV12352',
    total: 1000000,
    status: {
      name: 'Pending',
      color: 'text-yellow-600',
    },
  },
  {
    product: 'Product I',
    date: '2023-10-09',
    invoiceId: 'INV12353',
    total: 1000000,
    status: {
      name: 'Rejected',
      color: 'text-red-600',
    },
  },
  {
    product: 'Product J',
    date: '2023-10-10',
    invoiceId: 'INV12354',
    total: 1000000,
    status: {
      name: 'Accepted',
      color: 'text-green-600',
    },
  },
]

const HistoryTable = () => {
  return (
    <table className='w-[55rem] sm:w-[65rem] md:w-[70rem] xl:w-full h-[85%] text-left text-sm md:text-base table-auto min-w-max border-collapse rounded-xl'>
      <thead className='w-full block rounded-t-xl bg-primary-blue/5'>
        <tr className='w-full flex items-start p-3 md:p-5'>
          <th className='w-[30%]'>Product</th>
          <th className='w-[15%]'>Date</th>
          <th className='w-[20%]'>Invoice ID</th>
          <th className='w-[15%]'>Total</th>
          <th className='w-[10%]'>Status</th>
          <th className='w-[10%] text-right'>Action</th>
        </tr>
      </thead>
      <tbody className='block h-full overflow-y-auto'>
        {dummyData.map((data, index) => (
          <React.Fragment key={index}>
            <tr className='flex items-center w-full px-3 py-1 md:px-5 md:py-3'>
              <td className='w-[30%]'>{data.product}</td>
              <td className='w-[15%]'>{data.date}</td>
              <td className='w-[20%]'>{data.invoiceId}</td>
              <td className='w-[15%]'>
                {data.total.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                })}
              </td>
              <td className={`w-[10%] font-semibold ${data.status.color}`}>
                {data.status.name}
              </td>
              <td className='w-[10%] text-right'>
                <button className='text-white bg-secondary-yellow hover:bg-primary-yellow active:bg-primary-yellow py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out'>
                  Details
                </button>
              </td>
            </tr>
            {dummyData.length - 1 !== index && (
              <tr className='block w-full h-0.25 sm:h-0.5 bg-slate-200'></tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default HistoryTable
