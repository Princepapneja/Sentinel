import { Badge } from '@/components/ui/badge'
import React from 'react'
import useData from '../customHooks/useData'

const Pivots = () => {
    const {filterIncidents,highFilterIncidents}= useData()
    return (
        <>
            <div className='flex gap-2 justify-between'>
                <div className='flex gap-2'>
                <Badge>Unassigned: {filterIncidents?.filter((e: any) => {
                    return e.properties.owner.assignedTo === null
                })?.length}</Badge>
                <Badge>New Incidents: {filterIncidents?.filter((e: any) => {
                    return e.properties.status === "New"

                })?.length}</Badge>
                </div>
                <div className='flex gap-2'>
                <Badge className='bg-info '>Informational severity: {highFilterIncidents?.length}</Badge>

                <Badge className='bg-low'>Low severity: {highFilterIncidents?.length}</Badge>
                <Badge className='bg-medium'>High severity: {highFilterIncidents?.length}</Badge>
                <Badge className='bg-high'>High severity: {highFilterIncidents?.length}</Badge>
                </div>
            </div>

        </>
    )
}

export default Pivots