'use client'
import useData from '@/components/essentails/customHooks/useData';
import { getSignInLogs } from '@/components/essentails/functions/graphService';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

interface SignInLogsProps {
    accessToken: string;
}

const SignInLogs: React.FC<SignInLogsProps> = () => {
    const [signInLogs, setSignInLogs] = useState([]);
    const {token}: any = useData()

    useEffect(() => {
        debugger
        console.log(token)
        if (token !== "" || !token) {

            fetchSignInLogs();
        }
    }, [token]);
    const fetchSignInLogs = async () => {
        try {
            const logs = await getSignInLogs(token);
            setSignInLogs(logs);
        } catch (error) {
            console.error('Error fetching sign-in logs:', error);
        }
    };

    return (
        <div>
            <h2>Sign-in Logs</h2>
            <ul>
                {signInLogs.map((log: any) => (
                    <li key={log.id}>{log.userDisplayName} - {log.clientAppUsed}</li>
                ))}
            </ul>
        </div>
    );
};

export default SignInLogs;
