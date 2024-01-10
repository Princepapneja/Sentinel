'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import Context from './context';
import { fetchData } from '../essentails/functions/fetchData';
import { refreshToken } from '../essentails/functions/refreshToken';
import { useSession } from "next-auth/react"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/option';
interface ContextLayoutProps {
    children: ReactNode;
}

const ContextLayout: React.FC<ContextLayoutProps> = ({ children }) => {
    const { data: session }:any = useSession();

    const [incidents, setIncidents] = useState<any>([]);
    const [token, setToken] = useState(session?.token)
    const [authResult, setAuthResult] = useState<any>(null);
    
    const fetchIncidents = async () => {

        
            const graphApiUrl = 'https://graph.microsoft.com/v1.0/security/alerts';
            let data = await fetchData(graphApiUrl, session.token)
            const filteredData = data?.value?.filter((e:any) => {
            let curDate:any= new Date()
            const newDate:any= new Date(e.createdDateTime)
                    return  (curDate - newDate < 24 * 60 * 60 * 1000);
                });
            setIncidents(filteredData)
            console.log(filteredData);
            
        // }

        // }
    }
    return (
        <>
            <Context.Provider value={{ incidents, setIncidents, token, setToken,authResult, setAuthResult,fetchIncidents }}>
                {children}
            </Context.Provider>
        </>
    );
};

export default ContextLayout;
