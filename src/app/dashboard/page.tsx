import Dashboard from '@/components/templates/dashobard'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/option'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
      redirect("/")
  }
  // console.log(session,"session");
  
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Page