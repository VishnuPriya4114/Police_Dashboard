import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    // Fetch data from the API
    fetch('http://localhost/Anekal.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        // Access query_1 array from JSON response
        const query1Data = jsonData.query_1;
        // Check if the response is valid JSON array
        if (!Array.isArray(query1Data)) {
          throw new Error('Response is not a valid JSON array');
        }
        // Parse and format the data for stacked bar chart
        const formattedData = query1Data.map(item => ({
          Year: item.Year,
          Arrested: parseInt(item.Arrested),
          total_accused: parseInt(item.total_accused),
          Chargesheeted: parseInt(item.Chargesheeted),
          Convicted: parseInt(item.Convicted)
          // Add more categories if needed
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="stacked-bar-chart-container">
      <h2>Accused Analysis Across Years</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Arrested" fill="#8884d8" />
          <Bar dataKey="total_accused" fill="#82ca9d" />
          <Bar dataKey="Chargesheeted" fill="#dc143c" />
          <Bar dataKey="Convicted" fill="#ff1493" />
          {/* Add more Bar components for additional categories */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
