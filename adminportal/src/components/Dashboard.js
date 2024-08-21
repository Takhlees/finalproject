// Dashboard.js
import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Bookings</h3>
                    <p>150</p>
                </div>
                <div className="card">
                    <h3>Available Rooms</h3>
                    <p>30</p>
                </div>
                <div className="card">
                    <h3>Check-ins Today</h3>
                    <p>10</p>
                </div>
                <div className="card">
                    <h3>Revenue</h3>
                    <p>$12,000</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
