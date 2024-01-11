import React, { useEffect } from 'react'

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }: any) => {
  useEffect(() => {

  }, [totalPages])
  return (
    <>
      <div className='p-1 flex gap-2 justify-between'>
        <button onClick={prevPage}>
          Previous
        </button>
        <div>

          <span>{currentPage}</span>
          <span> of </span>
          <span>{totalPages}</span>
        </div>
        <div>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>

    </>
  )
}

export default Pagination