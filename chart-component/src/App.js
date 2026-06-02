import './App.css';

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import dataCSV from './data_files/dataM.csv';

import LineChart from './components/LineChart';
import TableChart from './components/TableChart';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse( dataCSV , {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function(result) {
        setData(result.data);
      },
      error: (error) => {
        console.error('Error while parsing CSV:', error.message)
      }
    })
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <LineChart csvData={data} />
      <TableChart data={data} />
      <hr />
    </div>
  );
}

export default App;
