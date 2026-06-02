import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

function LineChart({ csvData }) {
    const [labels, setLabels] = useState([]);
    const [ datas, setDatas ] = useState([]);

    function getGradient(ctx, chartArea) {
        let gradient, width, height;
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!gradient || width !== chartWidth || height !== chartHeight) {
          width = chartWidth;
          height = chartHeight;
          gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgb(54, 162, 235)");
          gradient.addColorStop(0.5, "rgb(255, 205, 86)");
          gradient.addColorStop(1, "rgb(255, 99, 132)");
        }

        return gradient;
      }

    const options = {
        responsive: true,
        plugins: {
            length: {
                position: 'top',
            },
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyleWidth: 20,
                },
                title: {
                    padding: 10,
                },
                onClick: function() {},
            },
            tooltip : {
                enabled: true,
                displayColors: false,
                callbacks : {
                    label: function (context) {
                        return `Value: ${context.parsed.y}`
                    }
                }
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
                font: {
                    size: 18,
                },
                align: "start"
            },
            subtitle: {
                display: true,
                text: "Subtitle",
                font: {
                    size: 14,
                },
                align: "start",
            }
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: "The Number of Overdose",
                }
            },
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Years"
                }
            }
        },
        elements: {
            line: {
                tension: .5
            },
            point: {
                radius: 3,
                hoverRadius: 10,
                hitRadius: 10,
            },
        }
    };
 
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: datas,
                borderColor: function(context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return 'rgb(255, 99, 132)';
                    }

                    return getGradient(ctx, chartArea)
                },
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    useEffect(() => {
        if (csvData.length > 0) {
            const property = Object.getOwnPropertyNames(csvData[0])
            setLabels(csvData.map((row) => row[property[0]]))
            setDatas(csvData.map((row) => parseFloat(row[property[1]])))
        }
    }, [csvData])

    return (
        <div className="chart-container">
            <Line options={options} data={data} />
        </div>
    )

}

export default LineChart;