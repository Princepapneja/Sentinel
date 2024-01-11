import React from 'react'

const Modal = ({ children }: any) => {
    return (
        <div className='grid fixed top-0 left-0 h-screen place-items-center backdrop-blur-sm w-full '>
            <div className='bg-white p-4'>
                {children}
            </div>


        </div>
    )
}

export default Modal