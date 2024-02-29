import { Badge } from '@/components/ui/badge'
import React from 'react'
import useData from '../customHooks/useData'

const AnalyticsPivots = () => {
    const {Analytics}= useData()
    return (
        <>
            <div className='flex gap-2 justify-between  flex-col  md:flex-row'>
                <div className='flex gap-2 '>
                <Badge>Enabled: {Analytics?.filter((e: any) => {
                    return e.properties.enabled
                })?.length}</Badge>
                <Badge>Disabled: {Analytics?.filter((e: any) => {
                    return !e.properties.enabled

                })?.length}</Badge>
                </div>
                <div className='flex gap-2'>
                <Badge className='bg-info '>Informational : {Analytics?.filter((e: any) => {
                    return e.properties.severity==="Informational"

                })?.length}</Badge>

                <Badge className='bg-low'>Low : {Analytics?.filter((e: any) => {
                    return e.properties.severity==="Low"

                })?.length}</Badge>
                <Badge className='bg-medium'>Medium : {Analytics?.filter((e: any) => {
                    return e.properties.severity==="Medium"

                })?.length}</Badge>
                <Badge className='bg-high'>High : {Analytics?.filter((e: any) => {
                    return e.properties.severity==="High"

                })?.length}</Badge>
                </div>
            </div>

        </>
    )
}

export default AnalyticsPivots