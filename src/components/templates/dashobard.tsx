'use client'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from '../ui/button'
import { MegaphoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import IncidentLineChart from '../essentails/snippets/incidentLineChart'
import IncidentBarChart from '../essentails/snippets/barData'

export default function Dashboard() {
  const [times, setTimes] = useState({
    mttt: "",
    mttc:""
  })
  const { Analytics, incidents, lowFilterIncidents, mediumFilterIncidents, highFilterIncidents, infoIncidents, infoFilterIncidents, filterIncidents, lowIncidents, highIncidents, mediumIncidents } = useData()

 
  const data = {
    labels: [`Low`, `Medium`, `High`, `Informational`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowIncidents?.length, mediumIncidents?.length, highIncidents?.length, infoIncidents?.length],

        backgroundColor: [
          '#1678CF',
          '#09579E',
          '#003870',
          '#BAE1FF',
        ],
        borderWidth: 1,
      },
    ],
  };
  const analyticData = {
    labels: [`Enable`, `Disable`],
    datasets: [
      {
        label: '# of Analytics',
        data: [Analytics?.filter((rule: any) => (rule.properties.enabled))?.length, Analytics.filter((rule: any) => (!rule.properties.enabled))?.length],

        backgroundColor: [
          '#333632',
          '#d1d1d1',

        ],
        borderWidth: 1,
      },
    ],
  };
  let todayData = {
    labels: [`Low`, `Medium`, `High`, `Informational`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowFilterIncidents?.length, mediumFilterIncidents?.length, highFilterIncidents?.length, infoFilterIncidents?.length],
        backgroundColor: [
          '#DFA693',
          '#E14B32',
          '#C33726',
          '#a8adb2',


        ],

        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    console.log(filterIncidents);
    if (incidents && incidents.length > 0) {
    
  
      calculateTimes();
    }
  }, [incidents])
  const calculateTimes = () => {
    let totalTriageTime = 0;
    let totalClosureTime = 0;

    incidents.forEach((incident: any) => {
      const triageTime = calculateTimeDifference(incident.properties.createdTimeUtc, incident.properties.lastModifiedTimeUtc);
      totalTriageTime += triageTime;

      const closureTime = calculateTimeDifference(incident.properties.createdTimeUtc, incident.properties.closedTimeUtc);
      totalClosureTime += closureTime;
    });

    const meanTimeToTriage = totalTriageTime / incidents.length;
    const meanTimeToClosure = totalClosureTime / incidents.length;

    const mttt = convertMillisecondsToHoursAndMinutes(meanTimeToTriage);
    const mttc = convertMillisecondsToHoursAndMinutes(meanTimeToClosure);

    setTimes({ mttt: mttt, mttc: mttc });
  };
  function calculateTimeDifference(startTime: any, endTime: any) {
    const start: any = new Date(startTime);
    const end: any = new Date(endTime);
    return end - start;
  }
  
  function convertMillisecondsToHoursAndMinutes(milliseconds: any) {
    const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds

    console.log(hours ,minutes)
    if (isNaN(hours) || isNaN(minutes)) {
      return '0 hr';
  } else {
      return `${hours}.${minutes} hr`;
  }
  }
  
  return (
    <>

      <main className="   p-4  md:p-6 space-y-4">
        <div className="flex items-center ">
          <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
          <Button className="ml-auto" size="sm">
            Incidents
          </Button>
        </div>

        <div className='flex gap-4 '>
          <div className="border-l-4 border-primary  p-4 bg-muted rounded-lg shadow-md">
            <div className="text-md font-semibold">Mean Time to Triage</div>
            <div className="font-semibold text-2xl">{times.mttt}</div>
          </div>
          <div className="border-l-4 border-primary  p-4 bg-muted rounded-lg shadow-md">
            <div className="text-md font-semibold">Mean Time to Closure</div>
            <div className="font-semibold text-2xl">{times.mttc || "Nan"}</div>
          </div>
          {/* <div className="border-l-4 border-primary  p-4 bg-muted rounded-lg shadow-md">
            <div className="text-md font-semibold">Mean Time to Closure</div>
            <div className="font-semibold text-2xl">{times.mttc || "Nan"}</div>
          </div> */}
          
        </div>
        {/* <div className='flex gap-4'>

            <div className='h-96 w-full flex gap-4'>
              
        <IncidentLineChart/>
        
        </div>
        <Card>
            <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className=' max-w-md w-full bg-white h-full'>


                {
                  filterIncidents?.length > 0 ?
                    <div >
                      <Doughnut data={todayData} />
                    </div>
                    :
                    <div className='grid place-items-center' >
                      < MegaphoneOff className='w-60 h-60' />
                      <h3 className='font-bold'>No Incidents</h3>
                    </div>
                }
              </div>

            </CardContent>
          </Card>
            </div> */}
        <div className='flex gap-4'>

            <Card className='h-96 w-full bg-popover'>
            {/* <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader> */}
            <CardContent className='h-96'>
        <IncidentBarChart/>
        
        </CardContent>
          </Card>
        <Card>
            <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className=' max-w-md w-full bg-white h-full'>


                {
                  filterIncidents?.length > 0 ?
                    <div >
                      <Doughnut data={todayData} />
                    </div>
                    :
                    <div className='grid place-items-center' >
                      < MegaphoneOff className='w-60 h-60' />
                      <h3 className='font-bold'>No Incidents</h3>
                    </div>
                }
              </div>

            </CardContent>
          </Card>
            </div>
        <div className='flex gap-4'>

            <Card className='h-96 w-full bg-popover'>
            {/* <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader> */}
            <CardContent className='h-96'>
            <IncidentLineChart/>
        
        </CardContent>
          </Card>
        <Card>
            <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className=' max-w-md w-full bg-white h-full'>


                {
                  filterIncidents?.length > 0 ?
                    <div >
                      <Doughnut data={todayData} />
                    </div>
                    :
                    <div className='grid place-items-center' >
                      < MegaphoneOff className='w-60 h-60' />
                      <h3 className='font-bold'>No Incidents</h3>
                    </div>
                }
              </div>

            </CardContent>
          </Card>
            </div>

       
        <div className='grid grid-cols-4  gap-6   '>
         
      
          <Card>
            <CardHeader>
              <CardTitle> Total Incidents {incidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='max-w-md w-full bg-white'>

                {/* charts  */}
                {
                  incidents?.length > 0 ?
                    <div >

                      <Doughnut data={data} />
                    </div>
                    :
                    <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>

                      <div>

                        <h3>Improve your coverage</h3>

                      </div>
                    </div>
                }
              </div>

            </CardContent>
          </Card>
         
          <Card>
            <CardHeader>
              <CardTitle> Analytic Rules {Analytics?.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='max-w-md w-full bg-white'>

                {/* charts  */}
                {
                  incidents?.length > 0 ?
                    <div >

                      <Doughnut data={analyticData} />
                    </div>
                    :
                    <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>

                      <div>

                        <h3>Improve your coverage</h3>

                      </div>
                    </div>
                }
              </div>

            </CardContent>
          </Card>
     
        </div>



      </main>

    </>
  )
}
