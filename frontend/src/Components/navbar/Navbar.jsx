import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">TIERS Booking</span>
        <div className="navItems">
          <Link to="/auth/register">
            <button className="navButton">Register</button>
          </Link>
          <Link to="/auth/login">
            <button className="navButton">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
