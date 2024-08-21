import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any session or authentication state here
        // Example: localStorage.removeItem('authToken');
        localStorage.removeItem('authToken'); // Example for token-based auth

        // Call the passed onLogout function if you need to clear more state
        if (onLogout) {
            onLogout(); 
        }

        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="navbar">
            <span>Welcome Admin</span>
            <div className="navbar-user">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
