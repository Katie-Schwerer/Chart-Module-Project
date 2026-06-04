import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import readDataArray from "../data_function";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function StackedBarChart( {csvData} ) {
    const [labels, setLabels] = useState([]);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        if (csvData.length > 0) {
            const property = Object.getOwnPropertyNames(csvData[0])
            setLabels(csvData.map((row) => row[property[0]]));
            setDatas(readDataArray(csvData, property));
        } 
    }, [csvData])

    const options = {
        plugins: {
            legend : {
                position: "top",
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            }
        }
    };

    const data = {
        labels,
        datasets: datas,
    }

    return (
        <div className="chart-container">
            <Bar options={options} data={data} />
        </div>
    )

}

export default StackedBarChart;