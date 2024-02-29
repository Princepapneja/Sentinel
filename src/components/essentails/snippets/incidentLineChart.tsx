import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import useData from '../customHooks/useData';

const IncidentLineChart = () => {
    const { filterIncidents } = useData()
    const [chartData, setChartData] = useState<any>({});

    useEffect(() => {
        makeChartData()
    }, [filterIncidents]);
    const makeChartData = () => {
        if (!(filterIncidents?.length > 0)) return;

        const dataBySeverity: any = {};

        filterIncidents?.forEach((incident: any) => {
            const createdAt = new Date(incident.properties.createdTimeUtc);
            const severity = incident.properties.severity;

            // Get month and day from createdAt
            const month = createdAt.toLocaleString('default', { month: 'short' }); // Convert month to short format (e.g., Feb)
            const day = createdAt.getDate();

            // Create a label for the x-axis (date)
            const label = `${month} ${day}`;

            // Initialize the data array for this severity if not already done
            if (!dataBySeverity[severity]) {
                dataBySeverity[severity] = {
                    label: severity,
                    data: {},
                };
            }

            // Increment the count for this severity on this date
            if (!dataBySeverity[severity].data[label]) {
                dataBySeverity[severity].data[label] = 1;
            } else {
                dataBySeverity[severity].data[label]++;
            }
        });

        // Prepare datasets for Chart.js
        const datasets = Object.values(dataBySeverity)?.map((severityData: any) => {
            return {
                label: severityData.label,
                data: Object.values(severityData.data),
                fill: true,
                borderColor: getColorBySeverity(severityData.label),
                backgroundColor: getColorBySeverity(severityData.label),
            };
        });
        debugger
        setChartData({
            labels: Object.keys(dataBySeverity[Object.keys(dataBySeverity)[0]].data).reverse(), // Reverse the order of labels
            datasets: datasets,
        });
    };


    const getColorBySeverity = (severity: any) => {
        switch (severity) {
            case 'Low':
                return '#DFA693';
            case 'Medium':
                return '#E14B32';
            case 'High':
                return '#C33726';
            case 'Informational':
                return '#a8adb2';
            default:
                return '#000000';
        }
    };

    return (
        <>
            {
                Object.keys(chartData)?.length > 0 &&
                <Line data={chartData} className='grow'  />
            }
        </>
    );
};

export default IncidentLineChart;
