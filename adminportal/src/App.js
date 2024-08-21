import React, { useState } from 'react';
import './assets/styles/global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Dashboard from './pages/Dashboard';
import ManageRooms from './pages/ManageRooms';
import ManageBookings from './pages/ManageBookings';
import ManageEmployees from './pages/ManageEmployees';
import Reviews from './pages/Reviews'
import Login from './pages/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (email, password) => {
        const fixedEmail = 'admin@example.com';
        const fixedPassword = 'admin123';

        if (email === fixedEmail && password === fixedPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid email or password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {isAuthenticated ? (
                <div className="app">
                   
                    <div className="main-content">
                       
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/rooms" element={<ManageRooms />} />
                            <Route path="/bookings" element={<ManageBookings />} />
                            <Route path="/employees" element={<ManageEmployees />} />
                            <Route path="/reviews" element={<Reviews />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                   
                </Routes>
            )}
        </Router>
    );
}

export default App;
