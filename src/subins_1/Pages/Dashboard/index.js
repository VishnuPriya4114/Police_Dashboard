import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as AntTooltip, Card, Space, Statistic, Table, Typography } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { getCustomers, getInventory, getOrders, getRevenue } from '../../API';
import Bangloremap from './Bangloremap.js'
import Multichart from './Multichart.js';
import Linechart from './Linechart.js'
function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
      <DashboardCard
          
        />
      <Card style={{ width: 1000, height: 250 }}>
      <Linechart/>
      </Card>
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 350, height: 250 }}>
      <Space direction="horizontal">
        <div>
        <img
        src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg"
        alt="User Profile Picture"
        style={{
          width: '150px', // Adjust width as needed
          height: '100px', // Adjust height as needed
          borderRadius: '50%', // Make the image circular
          objectFit: 'cover', // Ensure the image fills the container
        }}
      />
      <h3>Assistant Commissoner Of Police</h3>
      <h3>Banglore City</h3>
        </div>
      </Space>
    </Card>
  );
}

function RecentOrders() {
  return (
    <Card style={{width:600,height:550}}>
     <center><h2>Bangalore Beat: Police Station Locator</h2></center> 
      <Bangloremap/>
    </Card>
  );
}

function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    fetch('http://localhost/Demo.php')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          Year: item.Year,
          Arrested: parseInt(item.Arrested),
          total_accused: parseInt(item.total_accused),
          Chargesheeted: parseInt(item.Chargesheeted),
          Convicted: parseInt(item.Convicted)
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="bar-chart-container">
    <Card style={{ width: 750, height: 550 }}>
    <center><h2>Behind the Bars: Graphing Accused Populations</h2></center>
     <Multichart/>
      </Card>
    </div>
  );
}

export default Dashboard;
