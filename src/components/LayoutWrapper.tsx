'use client'
import { LoginContextProvider } from '@/context/LoginContext'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Toaster } from 'sonner'
import Navbar from './Navbar'

const excludePaths = ['/login', '/register']

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname()
  const isExcludedPath = excludePaths.includes(currentPath)

  return (
    <>
      {isExcludedPath ? (
        children
      ) : (
        <LoginContextProvider>
          {!isExcludedPath && <Navbar />}
          {children}
        </LoginContextProvider>
      )}
      <Toaster richColors position='bottom-right' closeButton={false} />
    </>
  )
}

export default LayoutWrapper
