import './App.css';

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import dataCSV from './data_files/dataM.csv';
import medalsCSV from './data_files/medals.csv';
import gdpData from './data_files/gdp.csv';

import LineChart from './components/Charts/LineChart';
import BarChart from './components/Charts/BarChart';
import TableChart from './components/TableChart';
import StackedBarChart from './components/Charts/StackedBarChart';

function App() {
  const [data, setData] = useState([]);
  const [medals, setMedals] = useState([]);
  const [gdp, setGdp] = useState([]);

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

  useEffect(() => {
    Papa.parse(medalsCSV, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function(result) {
        console.log(result.data)
        setMedals(result.data);
      }, 
      error: (error) => {
        console.error('Error while parsing CSV:', error.message)
      }
      
    })
  }, [])

  useEffect(() => {
    Papa.parse(gdpData, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function(result) {
        console.log(result.data)
        setGdp(result.data);
      }, 
      error: (error) => {
        console.error('Error while parsing CSV:', error.message)
      }
      
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
      <LineChart csvData={data} />
      <TableChart data={data} />
      <hr />

      <BarChart csvData={data} />
      <TableChart data={data} />
      <hr />

      <StackedBarChart  csvData={medals} />
      <TableChart data={medals} />

      <BarChart csvData={gdp} />
      <TableChart data={gdp} />
    </div>
  );
}

export default App;
