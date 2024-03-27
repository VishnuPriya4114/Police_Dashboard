import React, { useState, useEffect } from 'react';
import './Table.css';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/Anekal.php');
      const jsonData = await response.json();
      setData(jsonData.query_3);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    row.FIRNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Untraced FIR 2016-2024</h2>
      <div className="search-container">
        <label htmlFor="search">Search by FIR No:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter FIR No"
        />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
