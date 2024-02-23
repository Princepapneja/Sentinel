'use client'
import useData from '@/components/essentails/customHooks/useData';
import { fetchData } from '@/components/essentails/functions/fetchData';
import { getSignInLogs } from '@/components/essentails/functions/graphService';
import React, { useState, useEffect } from 'react';

interface SignInLogsProps {
    accessToken: string;
}

const SignInLogs: React.FC<SignInLogsProps> = () => {
    const [signInLogs, setSignInLogs] = useState([]);
    const { token }: any = useData()

    useEffect(() => {

        console.log(token)

            fetchSignInLogs();
    }, [token]);
    const fetchSignInLogs = async () => {
        // try {
        //     const logs = await getSignInLogs(token);
        //     setSignInLogs(logs);
        //     console.log(logs);
        // } catch (error) {
        //     console.error('Error fetching sign-in logs:', error);
        // }
//         const da)ta = await fetchData     ("https://graph.microsoft.com/v1.0/me/drive/root:/SecurityEfficiencyWorkbook.xlsx:/content'")
// console.log(data;
    };

    return (
        <div>
            <h2>Sign-in Logs</h2>
            <ul>
                {signInLogs?.map((log: any) => (
                    <li key={log.id}>{log.userDisplayName} - {log.clientAppUsed}</li>
                ))}
            </ul>
        </div>
    );
};

export default SignInLogs;
