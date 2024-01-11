'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import Context from './context';
import { fetchData } from '../essentails/functions/fetchData';
import { useSession } from "next-auth/react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface ContextLayoutProps {
    children: ReactNode;
}

const ContextLayout: React.FC<ContextLayoutProps> = ({ children }) => {
    const { data: session }: any = useSession();
    ChartJS.register(ArcElement, Tooltip, Legend); 
    const [incidents, setIncidents] = useState<any>([]);
    const [filterIncidents, setFilterIncidents] = useState<any>([]);
    const [highIncidents, setHighIncidents] = useState<any>([]);
    const [mediumIncidents, setMediumIncidents] = useState<any>([]);
    const [highFilterIncidents, setHighFilterIncidents] = useState<any>([]);
    const [mediumFilterIncidents, setMediumFilterIncidents] = useState<any>([]);
    const [lowFilterIncidents, setLowFilterIncidents] = useState<any>([]);
    const [infoFilterIncidents, setInfoFilterIncidents] = useState<any>([]);
    const [infoIncidents, setInfoIncidents] = useState<any>([]);
    const [lowIncidents, setLowIncidents] = useState<any>([]);
    const [token, setToken] = useState(session?.token)
    const [authResult, setAuthResult] = useState<any>(null);

    const fetchIncidents = async () => {
        if (session) {


            const graphApiUrl = 'https://graph.microsoft.com/v1.0/security/alerts';
            // const graphApiUrl = "https://graph.microsoft.com/v1.0/security/alerts?$filter=vendorInformation/provider eq 'Azure Sentinel'"
            // const graphApiUrl = "https://graph.microsoft.com/v1.0/security/incidents"

            let data = await fetchData(graphApiUrl, session.token)
            const filteredData = data?.filter((e: any) => {
                let curDate: any = new Date()
                const newDate: any = new Date(e.createdDateTime)
                return (curDate - newDate < 24 * 60 * 60 * 1000);
            });
            
            setIncidents(data)
            setFilterIncidents(filteredData)
            console.log(filteredData);
            
            setHighFilterIncidents(filteredData?.filter((e:any)=>{
                return e.severity === "high"
            }))
            setMediumFilterIncidents(filteredData?.filter((e:any)=>{
                return e.severity === "medium"
            }))
            setLowFilterIncidents(filteredData?.filter((e:any)=>{
                return e.severity === "low"
            }))
            setInfoFilterIncidents(filteredData?.filter((e:any)=>{
                return e.severity === "informational"
            }))
            setHighIncidents(data?.filter((e:any)=>{
                return e.severity === "high"
            }))
            setMediumIncidents(data?.filter((e:any)=>{
                return e.severity === "medium"
            }))
            setLowIncidents(data?.filter((e:any)=>{
                return e.severity === "low"
            }))
            debugger
            setInfoIncidents(data?.filter((e:any)=>{
                return e.severity === "informational"
            }))

        }

        // }

        // }
    }
    return (
        <>
            <Context.Provider value={{filterIncidents,highIncidents,infoIncidents, setInfoIncidents,infoFilterIncidents, setInfoFilterIncidents,highFilterIncidents, setHighFilterIncidents,mediumIncidents,lowFilterIncidents,mediumFilterIncidents, setMediumFilterIncidents, setLowFilterIncidents,lowIncidents, setLowIncidents, setMediumIncidents, setHighIncidents, setFilterIncidents, incidents, setIncidents, token, setToken, authResult, setAuthResult, fetchIncidents }}>
                {children}
            </Context.Provider>
        </>
    );
};

export default ContextLayout;
