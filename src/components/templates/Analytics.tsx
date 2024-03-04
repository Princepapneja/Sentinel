'use client'

import React, { useEffect } from 'react';
import { Label } from '../ui/label';
import useData from '../essentails/customHooks/useData';
import AnalyticsPivots from '../essentails/snippets/AnalyticsPivots';
import AnalyticsTable from '../essentails/snippets/AnalyticsTable';
import CollapWrapper from '../essentails/snippets/collapWrapper';
import { AreaChart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';


const Analytics: React.FC = () => {
    const { Analytics } = useData();
    useEffect(() => {
        console.log(Analytics);
    }, [Analytics])
    return (

        <>
            <section className='p-4 md:p-6'>
                <div className='flex justify-between'>
                    <h1 className="font-semibold text-lg md:text-2xl">Analytics</h1>
                    <div className='flex gap:-2 items-center'>
                        <h2 className="font-semibold text-lg md:text-2xl">Total Analytics:-  </h2>
                        <Label className="font-semibold text-lg md:text-2xl" >{Analytics?.length} </Label>
                    </div>
                </div>
                <AnalyticsPivots />
                <div className='hidden md:block'>
                    <AnalyticsTable />

                </div>
                <ScrollArea className='md:hidden mt-4 h-[calc(100vh-200px)]'>
                    <div className=' space-y-2'>

                        {
                            Analytics?.map((item: any, index: number) => {
                                const { properties }: any = item
                                return <div key={index} className='border border-primary p-2 rounded'>

                                    <CollapWrapper header={<div className='flex gap-1 items-center justify-between grow'>
                                        <Label className=''>{properties?.displayName}</Label>

                                        <Badge className='justify-center  max-w-16 w-full ' style={{ background: `${properties?.severity === "Low" ? "#DFA693" : properties?.severity === "Medium" ? "#E14B32" : properties?.severity === "High" ? "#C33726" : "#c2c2c2"}` }}
                                        >{properties?.severity}</Badge>
                                    </div>}>



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

export default Analytics;

