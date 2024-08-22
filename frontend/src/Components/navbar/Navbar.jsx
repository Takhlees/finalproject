
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/auth/login'); 
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">TIERS Booking</span>
        <div className="navItems">
          {!isLoggedIn ? (
            <>
              <Link to="/auth/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/auth/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          ) : (
            <button className="navButton" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
