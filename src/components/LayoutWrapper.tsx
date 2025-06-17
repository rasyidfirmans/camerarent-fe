'use client'
import { LoginContextProvider } from '@/context/LoginContext'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Toaster } from 'sonner'
import Footer from './Footer'
import Navbar from './Navbar'

const excludePaths = ['/login', '/register']

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname()
  const isExcludedPath = excludePaths.includes(currentPath)

  return (
    <>
      <Toaster richColors position='bottom-right' closeButton={false} />
      {isExcludedPath ? (
        children
      ) : (
        <LoginContextProvider>
          {!isExcludedPath && <Navbar />}
          {children}
          {!isExcludedPath && <Footer />}
        </LoginContextProvider>
      )}
    </>
  )
}

export default LayoutWrapper
