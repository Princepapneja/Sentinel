'use client'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from '../ui/button'
import { MegaphoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import IncidentLineChart from '../essentails/snippets/incidentLineChart'

export default function Dashboard() {
  const [times, setTimes] = useState({
    mttt: ""
  })
  const { Analytics, incidents, lowFilterIncidents, mediumFilterIncidents, highFilterIncidents, infoIncidents, infoFilterIncidents, filterIncidents, lowIncidents, highIncidents, mediumIncidents } = useData()

  console.log(filterIncidents);

  const data = {
    labels: [`Low ${lowIncidents?.length}`, `Medium ${mediumIncidents?.length}`, `High ${highIncidents?.length}`, `Informational ${infoIncidents?.length}`],
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
    labels: [`Low ${lowFilterIncidents?.length}`, `Medium ${mediumFilterIncidents?.length}`, `High ${highFilterIncidents?.length}`, `Informational ${infoFilterIncidents}`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowFilterIncidents?.length, mediumFilterIncidents?.length, highFilterIncidents?.length, infoFilterIncidents?.length],
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
  useEffect(() => {
    console.log(filterIncidents);
    const timeToTriages = incidents?.map((incident: any) => {
      return calculateTimeDifference(incident.properties.createdTimeUtc, incident.properties.lastModifiedTimeUtc);
    });
    const totalTriageTime = timeToTriages?.reduce((total: any, time: any) => total + time, 0);
    const meanTimeToTriage = totalTriageTime / incidents?.length;
    const mttt = convertMillisecondsToHoursAndMinutes(meanTimeToTriage)
    setTimes({ mttt: mttt })

  }, [incidents])
  function calculateTimeDifference(startTime: any, endTime: any) {
    const start: any = new Date(startTime);
    const end: any = new Date(endTime);
    return end - start;
  }
  function convertMillisecondsToHoursAndMinutes(milliseconds: any) {
    const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds
    return `${hours}.${minutes} hr`;
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
            <div className="text-md font-semibold">Mean Time to Triage</div>
            <div className="font-semibold text-2xl">{times.mttt}</div>
          </div>
        </div>
        <div className='flex items-start'>
          <div className='grow '>
            
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
