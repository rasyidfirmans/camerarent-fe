'use client'

import { useState } from 'react'

const historyNavigation = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Accepted',
  },
  {
    id: 3,
    name: 'Pending',
  },
  {
    id: 4,
    name: 'Rejected',
  },
]

const Header = () => {
  const [activeNav, setActiveNav] = useState(historyNavigation[0].id)
  return (
    <>
      <section className='w-full flex flex-col gap-y-4 bg-white rounded-xl'>
        <div>
          <h1 className='text-md sm:text-lg md:text-xl font-bold text-secondary-blue'>
            Transaction History
          </h1>
        </div>
        <div className='w-full h-0.5 bg-slate-200'></div>
        <div>
          <ul className='flex items-center gap-x-5 sm:gap-x-8'>
            {historyNavigation.map((item, index) => (
              <li
                key={index}
                className={`relative ${
                  activeNav === item.id
                    ? 'text-primary-yellow'
                    : 'text-secondary-blue hover:text-secondary-blue/50'
                } text-sm font-semibold cursor-pointer transition-all duration-200 ease-in-out`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.name}
                <div
                  className={`absolute left-0 -bottom-2 h-0.5 bg-primary-yellow transition-all duration-300 ease-in-out ${
                    activeNav === item.id ? 'w-full' : 'w-0'
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Header
