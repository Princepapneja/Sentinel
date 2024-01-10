'use client'
import React, { useContext, useState } from 'react'
import Context from '../context/context'
import moment from 'moment'

const Incidents = () => {
    const tableHead = ["Servity", "Incident ID", "Title", "Alerts", "Incident provider name", "Alert product name", "Created time", "Last update time"]
    const [rowActive, setRowActive] = useState(0)
    const { incidents } = useContext(Context)
    return (
        <>

            <table>
                <thead>
                    <tr className=''>
                        <th>
                            <input type="checkbox" />

                        </th>
                        {tableHead.map((head: any, i: any) => {
                            return (
                                <th key={i} className='p-1'>{head}</th>
                            )

                        })}



                    </tr>

                </thead>
                <tbody>
                    {
                        incidents?.map((row: any, i: any) => {
                            return (
                                <tr key={i} onClick={() => { setRowActive(i) }} className={` p-1 group hover::bg-orange-50 `}>
                                    <td>
                                        <input type="checkbox" />

                                    </td>
                                    <td className={`${rowActive === i && "bg-orange-50" } group-hover:bg-orange-50  capitalize  border-l-8 ${row.severity === 'low'
                                            ? 'border-yellow-300'
                                            : row.severity === 'medium'
                                                ? 'border-orange-300'
                                                : row.severity === 'high'
                                                    ? 'border-red-700'
                                                    : ''
                                        }`}>  {row.severity}</td>
                                    <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.id}</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> {row.title}</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.vendorInformation.provider}</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.createdDateTime).format("MM/DD/YY, h:mm A")}</span></td>
                                    <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.lastModifiedDateTime).format("MM/DD/YY, h:mm A")}</span></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Incidents