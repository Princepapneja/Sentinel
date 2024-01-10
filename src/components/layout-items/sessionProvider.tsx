'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const ProviderLayout = ({children}:any) => {
  return (
    <>
    <SessionProvider>
        {children}
    </SessionProvider>
    
    </>
  )
}

export default ProviderLayout