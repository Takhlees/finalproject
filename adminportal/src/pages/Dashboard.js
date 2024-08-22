import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Add custom CSS file for specific styles

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    freeRooms: 0,
    totalBookings: 0,
    approvedBookings: 0,
    pendingBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/dashboard')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error('Error fetching dashboard stats:', error));
  }, []);

  return (
    <div className="dashboard">
      <h1> Dashboard </h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Rooms</h2>
          <p>{stats.totalRooms}</p>
        </div>
        <div className="card">
          <h2>Occupied Rooms</h2>
          <p>{stats.occupiedRooms}</p>
        </div>
        <div className="card">
          <h2>Free Rooms</h2>
          <p>{stats.freeRooms}</p>
        </div>
        <div className="card">
          <h2>Total Bookings</h2>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="card">
          <h2>Approved Bookings</h2>
          <p>{stats.approvedBookings}</p>
        </div>
        <div className="card">
          <h2>Pending Bookings</h2>
          <p>{stats.pendingBookings}</p>
        </div>
        <div className="card">
          <h2>Generated Revenue</h2>
          <p>${stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
