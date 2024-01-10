import Context from '@/components/context/context'
import React, { useContext } from 'react'

const useData = () => {
    const items = useContext(Context)
return items
}

export default useData