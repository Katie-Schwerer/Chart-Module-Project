import './App.css';

import React, { useState } from "react";
import Papa from "papaparse";

import dataCSV from './data_files/dataM.csv';

import LineChart from './components/LineChart';
import TableChart from './components/TableChart';

function App() {
  const [data, setData] = useState([]);

  const handleDataUpload = () => {
    Papa.parse( dataCSV , {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function(result) {
        setData(result);
      },
      error: (error) => {
        console.error('Error while parsing CSV:', error.message)
      }
    })
  }

  handleDataUpload();

  return (
    <div className="App">
      <h1>Hello World</h1>
      <LineChart />
      <TableChart data={data} />
    </div>
  );
}

export default App;
