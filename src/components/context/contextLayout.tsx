'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import Context from './context';
import { fetchData } from '../essentails/functions/fetchData';
import {
    Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { refreshToken } from '../essentails/functions/refreshToken';

interface ContextLayoutProps {
    children: ReactNode;
}

const ContextLayout: React.FC<ContextLayoutProps> = ({ children }) => {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title);
    const [Analytics, setAnalytics] = useState([])
    const [currentUser, setCurrentUser] = useState({})
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
    const [token, setToken] = useState("")
    const [authResult, setAuthResult] = useState<any>(null);
    const [navHeight, setNavHeight] = useState<number>(0);
    const [loader, setLoader] = useState(true)

    const fetchIncidents = async () => {



        const graphApiUrl = 'https://management.azure.com/subscriptions/434fddbe-606e-4cc9-b745-c63c6f20cb08/resourceGroups/Prince-workspace/providers/Microsoft.OperationalInsights/workspaces/Prince-workspace/providers/Microsoft.SecurityInsights/incidents?api-version=2023-11-01';
        // const graphApiUrl = 'https://graph.microsoft.com/v1.0/security/alerts';
        // const graphApiUrl = "https://graph.microsoft.com/v1.0/security/alerts?$filter=vendorInformation/provider eq 'Azure Sentinel'"
        // const graphApiUrl = "https://graph.microsoft.com/v1.0/security/incidents"

        let data = await fetchData(graphApiUrl, token)
        if (data === 401) {
            const newToken: any = await refreshToken()
            localStorage.setItem("token", newToken)
            setToken(newToken)
            data = await fetchData(graphApiUrl, token)
        }
        if (data?.length > 0) {
            const filteredData = data?.filter((e: any) => {
                let curDate: any = new Date()
                let newDate: any = new Date(e.properties.createdTimeUtc);
                return (curDate - newDate <30* 24 * 60 * 60 * 1000);
            });

            setIncidents(data)
            console.log(data, "ble");
            setFilterIncidents(filteredData)

            setHighFilterIncidents(filteredData?.filter((e: any) => {
                return e.properties.severity === "High"
            }))
            setMediumFilterIncidents(filteredData?.filter((e: any) => {
                return e.properties.severity === "Medium"
            }))
            setLowFilterIncidents(filteredData?.filter((e: any) => {
                return e.properties.severity === "Low"
            }))
            setInfoFilterIncidents(filteredData?.filter((e: any) => {
                return e.properties.severity === "Informational"
            }))
            setHighIncidents(data?.filter((e: any) => {
                return e.properties.severity === "High"
            }))
            setMediumIncidents(data?.filter((e: any) => {
                return e.properties.severity === "Medium"
            }))
            setLowIncidents(data?.filter((e: any) => {
                return e.properties.severity === "Low"
            }))

            setInfoIncidents(data?.filter((e: any) => {
                return e.properties.severity === "Informational"
            }))
        }


        // }

        // }
    }
    const fetchAnalytics = async () => {
        const url = 'https://management.azure.com/subscriptions/434fddbe-606e-4cc9-b745-c63c6f20cb08/resourceGroups/Prince-workspace/providers/Microsoft.OperationalInsights/workspaces/Prince-workspace/providers/Microsoft.SecurityInsights/alertRules?api-version=2023-11-01';
        let data = await fetchData(url, token)
        if (data === 401) {
            const newToken: any = await refreshToken()
            localStorage.setItem("token", newToken)
            setToken(newToken)
            data = await fetchData(url, token)
        }
        console.log(data);
        setAnalytics(data)

    }
    const fetchHeight = () => {
        const nav: any = document.querySelector(".nav")
        setNavHeight(nav?.scrollHeight)
    }
    useEffect(() => {
        let tokenLocal = localStorage.getItem("token")
        tokenLocal && setToken(tokenLocal)
        fetchHeight()


    }, [])
    return (
        <>
            <Context.Provider value={{ currentUser, setCurrentUser, Analytics, loader, setLoader, navHeight, filterIncidents, highIncidents, infoIncidents, setInfoIncidents, infoFilterIncidents, setInfoFilterIncidents, highFilterIncidents, setHighFilterIncidents, mediumIncidents, lowFilterIncidents, mediumFilterIncidents, setMediumFilterIncidents, setLowFilterIncidents, lowIncidents, setLowIncidents, setMediumIncidents, setHighIncidents, setFilterIncidents, incidents, setIncidents, token, setToken, authResult, setAuthResult, fetchIncidents, fetchAnalytics }}>
                {children}
            </Context.Provider>
        </>
    );
};

export default ContextLayout;
