'use client'
import Dashboard from '@/components/templates/dashobard'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useData from '@/components/essentails/customHooks/useData'

const Page =  () => {
 
  
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Page