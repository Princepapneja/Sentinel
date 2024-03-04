import { Badge } from '@/components/ui/badge'
import React from 'react'
import useData from '../customHooks/useData'

const Pivots = () => {
    const {incidents,  highIncidents,lowIncidents,mediumIncidents ,infoIncidents}= useData()
    return (
        <>
            <div className='flex flex-col md:flex-row gap-2 justify-between'>
                <div className='flex gap-2'>
                <Badge>Unassigned: {incidents?.filter((e: any) => {
                    return e.properties.owner.assignedTo === null
                })?.length}</Badge>
                <Badge>New Incidents: {incidents?.filter((e: any) => {
                    return e.properties.status === "New"

                })?.length}</Badge>
                <Badge>Active Incidents: {incidents?.filter((e: any) => {
                    return e.properties.status === "Active"

                })?.length}</Badge>
                </div>
                <div className='flex gap-2'>
                <Badge className='bg-info '>Informational : {infoIncidents?.length}</Badge>

                <Badge className='bg-low'>Low : {lowIncidents?.length}</Badge>
                <Badge className='bg-medium'>Medium : {mediumIncidents?.length}</Badge>
                <Badge className='bg-high'>High : {highIncidents?.length}</Badge>
                </div>
            </div>

        </>
    )
}

export default Pivots