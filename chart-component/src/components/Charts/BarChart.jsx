import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ csvData }) {
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
        font: {
          size: 18,
        },
      },
      subtitle: {
        display: true,
        text: "Sub Title",
        font: {
          size: 14,
        },
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Value: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: "The Number of Overdose",
        },
      },
      x: {
        display: true,
        title: {
          display: true,
          text: "Years",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Data 1",
        data: datas,
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  useEffect(() => {
    if (csvData.length > 0) {
      const property = Object.getOwnPropertyNames(csvData[0]);
      setLabels(csvData.map((row) => row[property[0]]));
      setDatas(csvData.map((row) => parseFloat(row[property[1]])));
    }
  }, [csvData]);

  return (
    <div className="">
      <Bar options={options} data={data} />)
    </div>
  );
}

export default BarChart;
