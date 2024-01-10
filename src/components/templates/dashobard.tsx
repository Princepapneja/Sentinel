'use client'
import Icons from '@/components/essentails/icons'
import Image from 'next/image'
import Link from 'next/link'
import {  useEffect } from 'react'
import useData from '../essentails/customHooks/useData'
import { refreshToken } from '../essentails/functions/refreshToken'

export default function Dashboard() {
  const {fetchIncidents,incidents}=useData()
  useEffect(() => {
    fetchIncidents()
  },[])
  return (
    <>
      <div>
        <div className='flex gap-4 mb-2 '>
          <div className='p-4 bg-white grow'>
            {/* //incidents  */}
            <div className="flex gap-1">
              <Icons type="warning" />

              <div>

                <span className="">Incidents {incidents?.length}</span>
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
              <h3>No incidents found
              </h3>
              <span>See incidents page for further information</span>
              <Link href="/dashboard/incidents" className='p-1 bg-primary px-2 text-white mt-2 '>Incidents</Link>
            </div>

          </div>
          {/* anaylatics */}

          <div className='p-4 bg-white'>
            <span className="">Analytics</span>
            <div className='flex gap-1'>
              <span>Current status</span>
              <Icons type="tooltip" />
            </div>
            {/* charts  */}
            <div className='h-24'></div>
            <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>
              <Icons type="case" />
              <div>

                <h3>Improve your coverage</h3>

              </div>
            </div>
          </div>
          <div>


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
            <div className='grid place-items-center'>
              <Icons type="case" />
              <h3>No incidents found
              </h3>
              <span>See incidents page for further information</span>
            </div>

          </div>
          {/* anaylatics */}

          <div className='p-4 bg-white'>
            <span className="">Analytics</span>
            <div className='flex gap-1'>
              <span>Current status</span>
              <Icons type="tooltip" />
            </div>
            {/* charts  */}
            <div className='h-24'></div>
            <div className='flex gap-3 p-4 rounded border-l-2 border-primary'>
              <Icons type="case" />
              <div>

                <h3>Improve your coverage</h3>

              </div>
            </div>
          </div>
          <div>


          </div>
        </div>
       

      </div>


    </>
  )
}
