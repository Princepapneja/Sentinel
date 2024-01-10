'use client'
import React from 'react'
import { getToken } from '../essentails/functions/getToken';
import useData from '../essentails/customHooks/useData';
import Link from 'next/link';

const Navbar = () => {
 const {setToken,setAuthResult}= useData()
    const login= async ()=>{
        let resp = await getToken()
        setToken(resp?.accessToken)
        setAuthResult(resp)
        // console.log(token,"red");
      
        
        
      }
  return (
    <>
    <div className='flex gap-1 p-4 justify-end'>
            <Link href="/">Home </Link>
            <Link href="/dashboard">Dashboard </Link>
            <button onClick={login}>Login </button>

    </div>
    
    </>
  )
}

export default Navbar