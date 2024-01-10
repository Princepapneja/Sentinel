'use client'
import React, { useEffect } from 'react'
import { getToken } from '../essentails/functions/getToken';
import useData from '../essentails/customHooks/useData';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { setToken, setAuthResult } = useData()
  const session = useSession()
  const router=useRouter()
  // const login= async ()=>{
  //     let resp = await getToken()
  //     setToken(resp?.accessToken)
  //     setAuthResult(resp)



  //   }
  useEffect(() => {
    session.status==="unauthenticated" && router.push("/")
  },[])
  return (
    <>
      <nav className='flex gap-2 p-4 justify-between bg-primary'>
        <Link href="/" className='text-white font-bold'>MS-Sentinel </Link>
        <div className='flex gap-3' >

          <Link href="/" className='text-secondary font-bold underline'>Home </Link>
          {
            session?.status!=="unauthenticated" &&
            <Link href="/dashboard" className='text-secondary font-bold underline'>Dashboard </Link>
          }
          <button onClick={() => { signOut() }} className='text-secondary font-bold underline'>Logout </button>

        </div>
      </nav>

    </>
  )
}

export default Navbar