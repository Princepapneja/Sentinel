

'use client'

import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import Context from '../context/context';
import IncidentTable from '../essentails/snippets/incidentTable';
import { Label } from '../ui/label';
import Pivots from '../essentails/snippets/pivots';
import useData from '../essentails/customHooks/useData';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import CollapWrapper from '../essentails/snippets/collapWrapper';
import { Badge } from '../ui/badge';


const Incidents: React.FC = () => {
    const { incidents, highIncidents, lowIncidents, mediumIncidents, infoIncidents } = useData();

    useEffect(()=>{

    },[incidents])
    return (

        <>
            <section className='p-4 md:p-6'>
                <div className='flex justify-between'>
                    <h1 className="font-semibold text-lg md:text-2xl">Incidents</h1>
                    <div className='flex gap:-2 items-center'>
                        <h2 className="font-semibold text-lg md:text-2xl">Total Incidents:-  </h2>
                        <Label className="font-semibold text-lg md:text-2xl" >{incidents?.length} </Label>
                    </div>
                </div>
                <Pivots />

                <div className='hidden md:block'>
                    <IncidentTable data={incidents} filters={true} />


                </div>
                <ScrollArea className='md:hidden mt-4 h-[calc(100vh-200px)]'>
                    <div className=' space-y-2'>

                        {
                            incidents?.map((item: any, index: number) => {
                                const { properties }: any = item
                                return <div key={index} className='border border-primary p-2 rounded'>

                                    <CollapWrapper header={<div className='flex gap-1 items-center justify-between grow'>
                                        <Label className=''>{properties?.title}</Label>

                                        <Badge className='justify-center  max-w-16 w-full ' style={{ background: `${properties?.severity === "Low" ? "#DFA693" : properties?.severity === "Medium" ? "#E14B32" : properties?.severity === "High" ? "#C33726" : "#c2c2c2"}` }}
                                        >{properties?.severity}</Badge>
                                    </div>}>

                                        <div>
                                            <p className='mb-1'>{properties?.description}</p>
                                            <div className='sm:flex  justify-between gap-2  space-y-2'>

                                                <Badge className=' capitalize py-1.5  border-black' >
                                                    <Label >{properties?.providerName || ""}</Label>
                                                </Badge>

                                                <div className='flex gap-2'>
                                                    <Badge className=' capitalize flex gap-1 py-1.5  border-black' variant={"outline"}>
                                                        <Label className='font-bold'>Alerts: </Label>
                                                        <Label >{properties?.additionalData?.alertsCount
                                                            || 0}</Label>
                                                    </Badge>
                                                    <Badge className=' capitalize flex gap-1 py-1.5  border-black' variant={"outline"}>
                                                        <Label >{properties?.status || ""}</Label>
                                                    </Badge>

                                                    <Badge className=' capitalize flex gap-1 py-1.5  border-black' variant={"outline"}>
                                                        <Label >{properties?.owner?.assignedTo || "Not assigned"}</Label>
                                                    </Badge>

                                                </div>

                                            </div>
                                        </div>

                                    </CollapWrapper>
                                </div>

                            })
                        }
                    </div>

                </ScrollArea>
            </section>
        </>
    );
}

export default Incidents;

