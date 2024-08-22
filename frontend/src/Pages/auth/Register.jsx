import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        
        console.log('Registration successful:', data);
        localStorage.setItem('token', data.token);
        
        
        if (data.role === 'admin') {
          window.location.href = 'http://localhost:3001';
        } else {
          navigate('/');
        }
      } else {
        
        console.error(data.message);
        setNotification(data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification('An error occurred during registration.');
    }
  };

  return (
    <div className='authpage'>
      <div className="authContainer">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Confirm Password</label> 
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
        <p className="terms">
          By logging in or creating an account, you agree with our <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Statement</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
