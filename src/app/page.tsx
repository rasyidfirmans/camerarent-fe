'use client'

import { LoginContext } from '@/context/LoginContext'
import React from 'react'

export default function Home() {
  const { isLoggedIn, userData } = React.useContext(LoginContext)

  return (
    <div className='h-screen'>
      {isLoggedIn && (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl font-bold'>Welcome, {userData.name}</h1>
          <p className='text-xl'>You are logged in!</p>
        </div>
      )}
    </div>
  )
}
