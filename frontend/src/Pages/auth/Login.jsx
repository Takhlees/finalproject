import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Login with email: ${email}, role: ${role}`);

    setNotification('You have successfully logged in!');

    setTimeout(() => {
      navigate('/');
    }, 2000); 

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.role === 'admin') {
        // Redirect to admin portal
        window.location.href = 'http://localhost:3001';
    } else {
        // Redirect to frontend
        navigate('/');
    }
      if (response.ok) {
       
        console.log('Login successful:', data);
        localStorage.setItem('userID', data.id); 
        localStorage.setItem('token', data.token);
      
      } else {
        console.error(data.message);
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div className='authpage'>
      <div className="authContainer">
        <h1>Login</h1>
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
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Login</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
        <p className="terms">
          By logging in or creating an account, you agree with our <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Statement</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
