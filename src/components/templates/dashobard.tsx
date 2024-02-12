'use client'
import Link from 'next/link'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from '../ui/button'
import IncidentTable from '../essentails/snippets/incidentTable'
import Spinner from '../essentails/snippets/Spinner'

export default function Dashboard() {
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
  return (
    <>

      <main className="   p-4  md:p-6 space-y-4">
        <div className="flex items-center ">
          <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
          <Button className="ml-auto" size="sm">
            Incidents
          </Button>
        </div>
        <div className='grid grid-cols-[1.5fr_1fr] gap-4 items-start'>

        <div className='w-full '>

          <Card>
            <CardHeader>
              <CardTitle><div className="flex gap-1">

                <div>

                  <span className="">Incidents {filterIncidents?.length}</span>
                  <div className='flex gap-1'>

                    <span>Last 24 hours
                    </span>
                  </div>
                </div>
              </div></CardTitle>
            </CardHeader>
            <CardContent>
              <div className=''>
                {
                  incidents?.length > 0 ?
                    <>
                    <IncidentTable data={filterIncidents}/>
                      
                    </>
                    :
                    <div className='grid place-items-center'>
                      <h3>No incidents found</h3>
                      <span>See incidents page for further information</span>
                      <Link href="/dashboard/incidents" className='p-1 bg-primary px-2 text-white mt-2 '>Incidents</Link>
                    </div>
                }

              </div>
              {/* anaylatics */}

              {/* charts  */}


            </CardContent>
          </Card>

        </div>
        <div className='grid grid-cols-2  gap-4  w-full '>
          <Card>
            <CardHeader>
              <CardTitle> Today Incidents {filterIncidents?.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=' max-w-md w-full bg-white'>

                {/* charts  */}
                {
                  incidents?.length > 0 ?
                    <div >

                      <Doughnut data={todayData} />
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

        </div>


      </main>

    </>
  )
}
