import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
import { PieChart } from '@mui/x-charts/PieChart';

  const data = [
    { value: 10, label: 'Users', color: '#BA0021'},
    { value: 10, label: 'Pets', color: '#FFD700'},
    { value: 10, label: 'Appointments', color: 'var(--CHELSEA-CUCUMBER)'},
    { value: 40, label: 'Services', color: '#007FFF'},
  ];
  
  const size = {
    width: 400,
    height: 200,
  };
  
  function PieArcLabel() {
    return (
      <PieChart
      series={[
        {
          data,
        },
      ]}
        {...size}
        sx={{
          '& .MuiPieSlice-root': {
            '&:nth-of-type(1)': { fill: '#BA0021' },
            '&:nth-of-type(2)': { fill: '#FFD700' },
            '&:nth-of-type(3)': { fill: 'var(--CHELSEA-CUCUMBER)' },
            '&:nth-of-type(4)': { fill: '#007FFF' },
          }
        }}
      />
    );
  }

const DashboardBody = () => {
    const dataset = [
        {
          Users: 59,
          Pets: 57,
          Appointments: 86,
          Services: 21,
          month: "Jan",
        },
        {
          Users: 50,
          Pets: 52,
          Appointments: 78,
          Services: 28,
          month: "Feb",
        },
        {
          Users: 47,
          Pets: 53,
          Appointments: 106,
          Services: 41,
          month: "Mar",
        },
        {
          Users: 54,
          Pets: 56,
          Appointments: 92,
          Services: 73,
          month: "Apr",
        },
        {
          Users: 57,
          Pets: 69,
          Appointments: 92,
          Services: 99,
          month: "May",
        },
        {
          Users: 60,
          Pets: 63,
          Appointments: 103,
          Services: 104,
          month: "June",
        },
        {
          Users: 59,
          Pets: 60,
          Appointments: 319,
          Services: 139,
          month: "July",
        },
        {
          Users: 65,
          Pets: 60,
          Appointments: 249,
          Services: 129,
          month: "Aug",
        },
        {
          Users: 51,
          Pets: 51,
          Appointments: 95,
          Services: 131,
          month: "Sept",
        },
        {
          Users: 60,
          Pets: 65,
          Appointments: 97,
          Services: 55,
          month: "Oct",
        },
        {
          Users: 67,
          Pets: 64,
          Appointments: 76,
          Services: 48,
          month: "Nov",
        },
        {
          Users: 61,
          Pets: 70,
          Appointments: 103,
          Services: 25,
          month: "Dec",
        },
    ];
    
  return (
    <div className="dashboard-body-contain-bar-chart-data">
        <ResponsiveContainer width="60%" height={400}>
            <BarChart data={dataset}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Users" fill="#BA0021" name="Users" />
              <Bar dataKey="Pets" fill="#FFD700" name="Pets" />
              <Bar dataKey="Appointments" fill="var(--CHELSEA-CUCUMBER)" name="Appointments" />
              <Bar dataKey="Services" fill="#007FFF" name="Services" />
            </BarChart>
          </ResponsiveContainer>
          <PieArcLabel />
    </div>
  )
}

export default DashboardBody