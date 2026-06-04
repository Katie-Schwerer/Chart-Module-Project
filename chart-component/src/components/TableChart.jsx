import React, { useEffect, useState } from "react";

function TableChart({ data }) {
  let [header, setHeader] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setHeader(Object.getOwnPropertyNames(data[0]));
    }
  }, [data]);

  return (
    <div className="table-container">
      <button onClick={() => setShowTable(!showTable)}>
        { showTable ? "Hide Table" : "Open Table"}
      </button>
      <table style={{ display: showTable ? "table" : "none"}}>
        <thead>
          <tr>
            {header.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                   {header.map((key, i) => (
                      <td key={i}>{item[key]}</td>
                   ))}
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableChart;
