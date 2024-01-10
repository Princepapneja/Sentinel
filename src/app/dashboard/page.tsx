'use client'
import Dashboard from '@/components/templates/dashobard'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useData from '@/components/essentails/customHooks/useData'

const Page =  () => {
  const {fetchIncidents}=useData()
  const session: any = useSession()
  useEffect(() => {
    fetchIncidents()
  }, [session])
  
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Page