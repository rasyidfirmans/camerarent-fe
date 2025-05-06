'use client'
import { Toaster } from 'sonner'

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster richColors position='bottom-right' closeButton={false} />
    </>
  )
}

export default LayoutWrapper
