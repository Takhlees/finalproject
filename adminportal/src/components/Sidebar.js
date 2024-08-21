import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
         <h1>Hotel Admin</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/rooms">Room Management</Link></li>
                <li><Link to="/bookings">Booking Management</Link></li>
                <li><Link to="/users">User Management</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/analytics">Analytics</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
