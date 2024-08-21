import React, { useState } from 'react';
import './assets/styles/global.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RoomManagement from './components/RoomManagement';
import BookingManagement from './components/BookingManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';

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
                    <Sidebar />
                    <div className="main-content">
                        <Navbar onLogout={handleLogout} />
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/rooms" element={<RoomManagement />} />
                            <Route path="/bookings" element={<BookingManagement />} />
                            <Route path="/usermanagement" element={<UserManagement />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
