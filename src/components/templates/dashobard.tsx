'use client'
import Icons from '@/components/essentails/icons'
import Link from 'next/link'
import useData from '../essentails/customHooks/useData'
import { Doughnut } from 'react-chartjs-2'
import Modal from '../essentails/snippets/modal'

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
          '#fde047',
          '#fdba74',
          '#b91c1c',
          '#e5e5e5',


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
          '#fde047',
          '#fdba74',
          '#b91c1c',
          '#e5e5e5',

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
            {
              incidents?.length > 0 ?
                <>
                  <div>
                    <div>
                    </div>
                    <div className='flex gap-4'>

                      
                      <div className='grid'>
                        <span> High </span>
                      <span title={highFilterIncidents?.length} style={{
                        width: `${highFilterIncidents?.length + 5}px`
                      }} className={` h-4 bg-[#b91c1c]`}></span>
                      </div>
                      <div className='grid'>
                        <span> Medium </span>
                      <span title={mediumFilterIncidents?.length} style={{
                        width: `${mediumFilterIncidents?.length + 5}px`
                      }} className={` h-4 bg-[#fdba74]`}></span>
                      </div>
                      <div className='grid'>
                        <span> Low </span>
                      <span title={lowFilterIncidents?.length} style={{
                        width: `${lowFilterIncidents?.length + 5}px`
                      }} className={` h-4 bg-[#fde047]`}></span>
                      </div>
                      <div className='grid'>
                        <span> Informational </span>
                      <span title={infoFilterIncidents?.length} style={{
                        width: `${infoFilterIncidents?.length + 5}px`
                      }} className={` h-4 bg-[#e5e5e5]`}></span>
                      </div>
                    </div>
                  </div>
                </>
                :
                <div className='grid place-items-center'>
                  <Icons type="case" />
                  <h3>No incidents found</h3>
                  <span>See incidents page for further information</span>
                  <Link href="/dashboard/incidents" className='p-1 bg-primary px-2 text-white mt-2 '>Incidents</Link>
                </div>
            }

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

                <span className="">All Incidents</span>
                <div className='flex gap-1'>

                 
                  <Icons type="tooltip" />
                </div>
              </div>
            </div>
            {/* count  */}
            {incidents?.length > 0 ?
              <div className='flex gap-4'>

                      
              <div className='grid'>
                <span> High </span>
              <span title={highIncidents?.length} style={{
                width: `${highIncidents?.length + 5}px`
              }} className={` h-4 bg-[#b91c1c]`}></span>
              </div>
              <div className='grid'>
                <span> Medium </span>
              <span title={mediumIncidents?.length} style={{
                width: `${mediumIncidents?.length + 5}px`
              }} className={` h-4 bg-[#fdba74]`}></span>
              </div>
              <div className='grid'>
                <span> Low </span>
              <span title={lowIncidents?.length} style={{
                width: `${lowIncidents?.length + 5}px`
              }} className={` h-4 bg-[#fde047]`}></span>
              </div>
              <div className='grid'>
                <span> Informational </span>
              <span title={infoIncidents?.length} style={{
                width: `${infoIncidents?.length + 5}px`
              }} className={` h-4 bg-[#e5e5e5]`}></span>
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
