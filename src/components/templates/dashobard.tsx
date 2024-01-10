'use client'
import Icons from '@/components/essentails/icons'
import Link from 'next/link'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'

export default function Dashboard() {
  const {  incidents,lowFilterIncidents,mediumFilterIncidents,highFilterIncidents, filterIncidents, lowIncidents, highIncidents, mediumIncidents } = useData()
 

  const data = {
    labels: [`Low ${lowIncidents?.length}`, `Medium ${mediumIncidents?.length}`, `High ${highIncidents?.length}`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowIncidents?.length, mediumIncidents?.length, highIncidents?.length],
        backgroundColor: [
          '#fde047',
          '#fdba74',
          '#b91c1c',

        ],

        borderWidth: 1,
      },
    ],
  };
  let todayData={
    labels: [`Low ${lowFilterIncidents?.length}`, `Medium ${mediumFilterIncidents?.length}`, `High ${highFilterIncidents?.length}`],
    datasets: [
      {
        label: '# of Incidents',
        data: [lowFilterIncidents?.length, mediumFilterIncidents?.length, highFilterIncidents?.length],
        backgroundColor: [
          '#fde047',
          '#fdba74',
          '#b91c1c',

        ],

        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div>
        <div className='flex gap-4 mb-2 '>
          <div className='p-4 bg-white grow'>
            {/* //incidents  */}
            <div className="flex gap-1">
              <Icons type="warning" />

              <div>

                <span className="">Incidents {filterIncidents?.length}</span>
                <div className='flex gap-1'>

                  <span>Last 24 hours
                  </span>
                  <Icons type="tooltip" />
                </div>
              </div>
            </div>
            {/* count  */}
            <div className='grid place-items-center'>
              <Icons type="case" />
              <h3>No incidents found</h3>
              <span>See incidents page for further information</span>
              <Link href="/dashboard/incidents" className='p-1 bg-primary px-2 text-white mt-2 '>Incidents</Link>
            </div>

          </div>
          {/* anaylatics */}

          {/* charts  */}
          <div className='p-4 max-w-md w-full bg-white'>
            <span className="">Today {filterIncidents?.length}</span>
            <div className='flex gap-1'>
              <span>Current status</span>
              <Icons type="tooltip" />
            </div>
            {/* charts  */}
            {
              incidents?.length > 0 ?
                <div className='p-4'>

                  <Doughnut data={todayData} />
                </div>
                :
                <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>
                  <Icons type="case" />
                  <div>

                    <h3>Improve your coverage</h3>

                  </div>
                </div>
            }
          </div>
          
        </div>
        <div className='flex gap-4 mb-2 '>
          <div className='p-4 bg-white grow'>
            {/* //data graph  */}
            <div className="flex gap-1">
              <Icons type="warning" />

              <div>

                <span className="">Data</span>
                <div className='flex gap-1'>

                  <span>Last 24 hours
                  </span>
                  <Icons type="tooltip" />
                </div>
              </div>
            </div>
            {/* count  */}
            {incidents?.length > 0 ?
              <div>
                <div>

                </div>
                <div>

                </div>
              </div>
              : <div className='grid place-items-center'>
                <Icons type="case" />
                <h3>No incidents found
                </h3>
                <span>See incidents page for further information</span>
              </div>}

          </div>
          {/* charts */}

          <div className='p-4 max-w-md w-full bg-white'>
            <span className="">Total {incidents?.length} </span>
            <div className='flex gap-1'>
              <span>Current status</span>
              <Icons type="tooltip" />
            </div>
            {/* charts  */}
            {
              incidents?.length > 0 ?
                <div className='p-4'>

                  <Doughnut data={data} />
                </div>
                :
                <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>
                  <Icons type="case" />
                  <div>

                    <h3>Improve your coverage</h3>

                  </div>
                </div>
            }
          </div>
          <div>


          </div>
        </div>


      </div>


    </>
  )
}
