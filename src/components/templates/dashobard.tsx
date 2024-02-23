'use client'
import Link from 'next/link'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from '../ui/button'
import { FileWarning, HandPlatter, MegaphoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import Pivots from '../essentails/snippets/pivots'

export default function Dashboard() {
  const [times, setTimes] = useState({
    mttt: ""
  })
  const { incidents, lowFilterIncidents, mediumFilterIncidents, highFilterIncidents, infoIncidents, infoFilterIncidents, filterIncidents, lowIncidents, highIncidents, mediumIncidents } = useData()

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
  const data2 = {
    labels: [`Low ${lowIncidents?.length}`, `Medium ${mediumIncidents?.length}`, `High ${highIncidents?.length}`, `Informational ${infoIncidents?.length}`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowIncidents?.length, mediumIncidents?.length, highIncidents?.length, infoIncidents?.length],

        backgroundColor: [
          '#DFA693',
          '#E14B32',
          '#C33726',
          '#E2E2E2',


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
          '#DFA693',
          '#E14B32',
          '#C33726',
          '#E2E2E2',


        ],

        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    const timeToTriages = [...highIncidents, ...infoIncidents]?.map((incident: any) => {
      return calculateTimeDifference(incident.properties.firstActivityTimeUtc, incident.properties.lastModifiedTimeUtc);
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
        <Pivots />
        {/* <h2>{times.mttt}</h2> */}

        <div className='grid grid-cols-4  gap-6   '>
          <Card>
            <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className=' max-w-md w-full bg-white h-full'>

                {/* charts  */}
                {
                  filterIncidents?.length > 0 ?
                    <div >

                      <Doughnut data={todayData} />
                    </div>
                    :
                    <div className='grid place-items-center' >
                      < MegaphoneOff className='w-32 h-32' />
                      <h3>No alerts today</h3>
                    </div>
                }
              </div>

            </CardContent>
          </Card>

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
              <CardTitle> Analytics {incidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='max-w-md w-full bg-white'>

                {/* charts  */}
                {
                  incidents?.length > 0 ?
                    <div >

                      <Doughnut data={data2} />
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
              <CardTitle> Total {incidents?.length}
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
        </div>



      </main>

    </>
  )
}
