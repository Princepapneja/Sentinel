// // 'use client'
// // import React, { useContext, useState } from 'react'
// // import Context from '../context/context'
// // import moment from 'moment'

// // const Incidents = () => {
// //     const tableHead = ["Servity", "Incident ID", "Title", "Alerts", "Incident provider name", "Alert product name", "Created time", "Last update time"]
// //     const [rowActive, setRowActive] = useState(0)
// //     const { incidents } = useContext(Context)
// //     return (
// //         <>

// //             <table>
// //                 <thead>
// //                     <tr className=''>
// //                         <th>
// //                             <input type="checkbox" />
// //                         </th>
// //                         {tableHead.map((head: any, i: any) => {
// //                             return (
// //                                 <th key={i} className='p-1'>{head}</th>
// //                             )

// //                         })}



// //                     </tr>

// //                 </thead>
// //                 <tbody>
// //                     {
// //                         incidents?.map((row: any, i: any) => {
// //                             return (
// //                                 <tr key={i} onClick={() => { setRowActive(i) }} className={` p-1 group hover::bg-orange-50 `}>
// //                                     <td>
// //                                         <input type="checkbox" />

// //                                     </td>
// //                                     <td className={`${rowActive === i && "bg-orange-50" } group-hover:bg-orange-50  capitalize  border-l-8 ${row.severity === 'low'
// //                                             ? 'border-yellow-300'
// //                                             : row.severity === 'medium'
// //                                                 ? 'border-orange-300'
// //                                                 : row.severity === 'high'
// //                                                     ? 'border-red-700'
// //                                                     : ''
// //                                         }`}>  {row.severity}</td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.id}</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> {row.title}</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.vendorInformation.provider}</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.createdDateTime).format("MM/DD/YY, h:mm A")}</span></td>
// //                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.lastModifiedDateTime).format("MM/DD/YY, h:mm A")}</span></td>
// //                                 </tr>
// //                             )
// //                         })
// //                     }
// //                 </tbody>
// //             </table>
// //         </>
// //     )
// // }

// // export default Incidents







// 'use client'

// import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
// import Context from '../context/context';
// import moment from 'moment';
// import ReactPaginate from 'react-paginate';
// import Pagination from '../essentails/snippets/pagination';
// import useData from '../essentails/customHooks/useData';

// interface Incident {
//     severity: string;
//     id: string;
//     title: string;
//     vendorInformation: {
//         provider: string;
//     };
//     createdDateTime: string;
//     lastModifiedDateTime: string;
//     // Add other fields as needed
// }

// const Incidents: React.FC = () => {
//     const { lowIncidents, mediumIncidents, highIncidents } = useData()
//     const tableHead: string[] = ["Severity", "Incident ID", "Title", "Alerts", "Incident provider name", "Alert product name", "Created time", "Last update time"];
//     const [rowActive, setRowActive] = useState<number>(0);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//     const [severityFilter, setSeverityFilter] = useState(null);
//     const [totalPages, setTotalPages] = useState<number>(0);
//     const [items, setItems] = useState<Incident[]>([]);
//     const { incidents } = useContext(Context);
//     const [indexOfLastItem, setIndexOfLastItem] = useState<number>(0);
//     const [indexOfFirstItem, setIndexOfFirstItem] = useState<number>(0);


//     // const nextPage = ({ selected }: { selected: number }) => setCurrentPage(selected + 1);
//     const prevPage = (() => {

//         let totalPages = Math.ceil(incidents?.length / itemsPerPage)
//         if (currentPage !== 1) {

//             setCurrentPage(currentPage - 1)

//         }

//     })
//     const nextPage = (() => {
//         if (currentPage !== totalPages) {

//             setCurrentPage(currentPage + 1)
//         }
//     })
//     useEffect(() => {
//         const lastIndex = currentPage * itemsPerPage;
//         setIndexOfLastItem(lastIndex);


//         const firstIndex = lastIndex - itemsPerPage;
//         setIndexOfFirstItem(firstIndex);
//         setTotalPages(Math.ceil(incidents?.length / itemsPerPage))

//         setItems(incidents?.slice(firstIndex, lastIndex))

//     }, []);

//     const handleSelect = ((e: ChangeEvent<HTMLSelectElement>) => {
//         const { value }: any = e.target
//         setSeverityFilter(value)
//         
//         setCurrentPage(1)

//         switch (value) {
//             case "low":
//                 setItems(lowIncidents?.slice(0, 10));
//                 setTotalPages(Math.ceil(lowIncidents?.length / itemsPerPage))

//                 break;
//             case "medium":
//                 setItems(mediumIncidents?.slice(0, 10));
//                 setTotalPages(Math.ceil(mediumIncidents?.length / itemsPerPage))

//                 break;
//             case "high":
//                 setItems(highIncidents?.slice(indexOfFirstItem, indexOfLastItem));
//                 setTotalPages(Math.ceil(highIncidents?.length / itemsPerPage))

//                 break;
//             default:
//                 setItems(incidents?.slice(indexOfFirstItem, indexOfLastItem));
//                 setTotalPages(Math.ceil(incidents?.length / itemsPerPage))

//                 break;
//         }

//     })

//     return (
//         <>
//             <div>

//                 <div>
//                     <label>
//                         Severity Filter:
//                         <select onChange={handleSelect}>
//                             <option value="">All</option>
//                             <option value="low">Low</option>
//                             <option value="medium">Medium</option>
//                             <option value="high">High</option>
//                         </select>
//                     </label>
//                 </div>
//                 <div>

//                     <table>
//                         <thead>
//                             <tr className=''>
//                                 <th>
//                                     <input type="checkbox" />
//                                 </th>
//                                 {tableHead.map((head, i) => (
//                                     <th key={i} className='p-1'>{head}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {items?.map((row: Incident, i: number) => (
//                                 <tr key={i} onClick={() => { setRowActive(i) }} className={` p-1 group ${i % 2 === 0 && "bg-white"} hover::bg-orange-50 `}>
//                                     {/* ... your existing code for table rows ... */}


//                                     <td>
//                                         <input type="checkbox" />

//                                     </td>
//                                     <td className={`${rowActive === i && "bg-orange-50"} group-hover:bg-orange-50  capitalize  border-l-8 ${row.severity === 'low'
//                                         ? 'border-yellow-300'
//                                         : row.severity === 'medium'
//                                             ? 'border-orange-300'
//                                             : row.severity === 'high'
//                                                 ? 'border-red-700'
//                                                 : ''
//                                         }`}>  {row.severity}</td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.id}</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> {row.title}</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.vendorInformation.provider}</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.createdDateTime).format("MM/DD/YY, h:mm A")}</span></td>
//                                     <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.lastModifiedDateTime).format("MM/DD/YY, h:mm A")}</span></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <Pagination nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} totalPages={totalPages} />
//                 </div>

//             </div>

//         </>
//     );
// }

// export default Incidents;




'use client'

import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import Context from '../context/context';
import moment from 'moment';
import IncidentTable from '../essentails/snippets/incidentTable';
import { Label } from '../ui/label';

interface Incident {
    severity: string;
    id: string;
    title: string;
    vendorInformation: {
        provider: string;
    };
    createdDateTime: string;
    lastModifiedDateTime: string;
    // Add other fields as needed
}

const Incidents: React.FC = () => {
    const { incidents } = useContext(Context);



    return (
        // <>
        //     <div>
        //         <div>
        //             <label>
        //                 Severity Filter:
        //                 <select onChange={handleSelect}>
        //                     <option value="">All</option>
        //                     <option value="low">Low</option>
        //                     <option value="medium">Medium</option>
        //                     <option value="high">High</option>
        //                     <option value="informational">Informational </option>
        //                 </select>
        //             </label>
        //         </div>
        //         <div>
        //             <table>
        //                 <thead>
        //                     <tr className=''>
        //                         <th>
        //                             <input type="checkbox" />
        //                         </th>
        //                         {tableHead.map((head, i) => (
        //                             <th key={i} className='p-1'>{head}</th>
        //                         ))}
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {items?.map((row: Incident, i: number) => (
        //                         <tr key={i} onClick={() => { setRowActive(i); handleIncident(row.id) }} className={` p-1 group ${i % 2 === 0 && "bg-white"} hover::bg-orange-50 `}>
        //                             <td>
        //                                 <input type="checkbox" />
        //                             </td>
        //                             <td className={`${rowActive === i && "bg-orange-50"} group-hover:bg-orange-50 capitalize border-l-8 ${row.severity === 'low'
        //                                 ? 'border-yellow-300'
        //                                 : row.severity === 'medium'
        //                                     ? 'border-orange-300'
        //                                     : row.severity === 'high'
        //                                         ? 'border-red-700'
        //                                         : ''
        //                                 }`}>  {row.severity}</td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.id}</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> {row.title}</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {row.vendorInformation.provider}</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "} `}>  <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'> alert</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.createdDateTime).format("MM/DD/YY, h:mm A")}</span></td>
        //                             <td className={`${rowActive === i && "bg-orange-50 "}  `}> <span className='text-ellipsis w-48 overflow-hidden whitespace-nowrap group-hover:bg-orange-50 p-1 block'>  {moment(row.lastModifiedDateTime).format("MM/DD/YY, h:mm A")}</span></td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>

        //             <Pagination nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} totalPages={totalPages} />
        //         </div>
        //     </div>
        //    {
        //     Object.keys(selectedIncident)?.length>0 &&  <Modal>
        //     <div> 
        //         <div className='flex justify-between gap-2'>
        //             <h4 className='font-bold text-xl'>Incident Details</h4>
        //         <button onClick={()=>{setSelectedIncident({})}}><GiCrossMark />  </button>

        //         </div>
        //         <div>

        //        <span className='font-bold text-xl'> Title : {selectedIncident?.title}  </span>
        //        </div>

        //        <div>
        //         <span className='font-bold text-xl'> Severity : </span> 

        //        <span className='capitalize'>{selectedIncident?.severity}</span>

        //         </div>
        //        <div>
        //         <span className='font-bold text-xl'> Active : </span> 

        //        <span className='capitalize'>{selectedIncident?.status==="newAlert" ? "New" :selectedIncident?.status }</span>

        //         </div>
        //     </div>
        // </Modal>
        //    }
        // </>
        <>
            <section className='p-4 md:p-6'>
                <div className='flex justify-between'>
                    <h1 className="font-semibold text-lg md:text-2xl">Incidents</h1>
                    <div className='flex gap:-2 items-center'>
                        <h2 className="font-semibold text-lg md:text-2xl">Total Incidents:-  </h2>
                        <Label className="font-semibold text-lg md:text-2xl" >{incidents?.length} </Label>
                    </div>
                </div>

                <IncidentTable data={incidents} filters={true} />
            </section>
        </>
    );
}

export default Incidents;

