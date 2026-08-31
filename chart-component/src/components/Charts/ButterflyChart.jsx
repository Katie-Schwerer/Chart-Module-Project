import React, { useState } from "react";
import { AgCharts } from "ag-charts-react"
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community"

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function ButterflyChart() {

     const data = [
            { category: 'Product A', like: 45, dislike: 20 },
            { category: 'Product B', like: 30, dislike: 45 },
            { category: 'Product C', like: 60, dislike: 15 },
            { category: 'Product D', like: 25, dislike: 30 },
        ]

    const chartData = data.map((item) => ({
        ...item,
        dislike: -item.dislike,
    }));


    const [chartOptions, setChartOptions] = useState({
        title: {
            text: "Market Survey: Dislike vs. Like Trends",
        },
        subtitle: {
            text: "Responses diverging from central baseline",
        },
        legend: {
            position: "top"
        },

        data: chartData,

        // Series Definition
        series: [
            {
                type: 'bar',
                direction: 'horizontal',
                xKey: 'category',
                yKey: 'like',
                yName: 'Positive Feedback',
                fill: '#4df0a0',
                stacked: true,
            },
            {
                type: 'bar',
                direction: 'horizontal',
                xKey: 'category',
                yKey: 'dislike',
                yName: 'Negative Feedback',
                fill: '#ff5c5c',
                stacked: true,
            }
        ],
        axes: {
            category: {
                position: 'left',
            },
            number: {
                position: 'bottom',
                label: {
                    formatter: ({ value }) => `${Math.abs(value)}`
                }
            }
        },
    })



    return (
        <div style={{ width: '100%', height: '500px'}}>
            <AgCharts options={chartOptions} />
        </div>
    )
}

export default ButterflyChart;