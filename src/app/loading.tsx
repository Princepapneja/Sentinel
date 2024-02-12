import Spinner from '@/components/essentails/snippets/Spinner'
import React from 'react'

const Loading = () => {
  return (
   <>
   <div className='fixed top-0 left-0 h-screen w-full grid items-center'>

   <Spinner/>
   </div>
   </>
  )
}

export default Loading