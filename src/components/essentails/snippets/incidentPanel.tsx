import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const IncidentPanel = ({ selectedIncident }: any) => {
    const { properties } = selectedIncident
    return (
        <>


            <Sheet >
                <SheetTrigger asChild id="incidentPanel">
                    <button></button>
                </SheetTrigger>
                <SheetContent className='  w-full max-w-[768px] sm:max-w-[768px] space-y-2'>
                    <SheetHeader>
                        <SheetTitle>Incident Activity Log</SheetTitle>
                        <SheetDescription>
                            Here is the logs of incident.
                        </SheetDescription>
                    </SheetHeader>
                    <Card className="w-full ">
                        <CardHeader className="p-6">


                            <CardTitle >
                                <div className='flex  justify-between gap-2 mb-1'>


                                    <Badge className=' capitalize flex gap-1 py-1.5  border-black' variant={"outline"}>
                                        <Label className='font-bold'>Assigned to: </Label>
                                        <Label >{properties?.owner?.assignedTo || "Not assigned"}</Label>
                                    </Badge>
                                </div>
                                <div className="text-lg flex justify-between items-center">

                                    <h3>
                                        Title:  {properties?.title}
                                    </h3>
                                    <Badge className=' capitalize text-white'  style={{ background: `${properties?.severity === "Low" ? "#DFA693" : properties?.severity === "Medium" ? "#E14B32" : properties?.severity === "High" ? "#C33726" : "#c2c2c2"}` }}>


                                    <Label
                                        
                                        >{properties?.severity}</Label>
                                        </Badge>
                                </div>

                            </CardTitle>
                            <CardDescription>

                                Description:  {properties?.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="">

                        </CardContent>
                    </Card>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>


        </>
    )
}

export default IncidentPanel