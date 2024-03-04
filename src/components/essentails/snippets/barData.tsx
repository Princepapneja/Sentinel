import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useData from '../customHooks/useData';

const IncidentBarChart = () => {
    const chartOptions:any={
        maintainAspectRatio:false,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
    }
    const [chartData, setChartData] = useState<any>({});
    const {filterIncidents}=useData()

    useEffect(() => {
        makeChartData();
    }, [filterIncidents]);
    const makeChartData = () => {
        if (!(filterIncidents?.length > 0)) return;
    
        const incidentsByHour:any = {};
    
        // Aggregate incidents by hour
        filterIncidents.forEach((incident:any) => {
            const createdAt = new Date(incident.properties.createdTimeUtc);
            const hourKey = createdAt.toISOString().split('T')[0] + ' ' + createdAt.getHours(); // Extract date and hour
    
            if (!incidentsByHour[hourKey]) {
                incidentsByHour[hourKey] = 1;
            } else {
                incidentsByHour[hourKey]++;
            }
        });
    
        // Extract labels and data for Chart.js
        const labels = Object.keys(incidentsByHour);
        const data = Object.values(incidentsByHour);
    
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Incidents Created',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235)', 
                    borderColor: 'rgba(54, 162, 235, 1)', 
                    borderWidth: 1,
                },
            ],
        });
    };
    

    return (
        <>
               {
                Object.keys(chartData)?.length > 0 &&  <Bar
                data={chartData}
                options={chartOptions}
            />
               }
        </>
    );
};

export default IncidentBarChart;
