import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import Cookies from 'js-cookie';

const Booking = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    contact: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    children: 0,
    adults: 1,
    amount: '', // This will now be populated with the "price" from the database
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userID');
    fetch(`http://localhost:4000/api/users/currentuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setFormData(prevData => ({
          ...prevData,
          userId: userId,
          name: data.name || '',
          email: data.email || '',
          contact: data.contact || '',
        }));
      })
      .catch(error => {
        console.error("Failed to fetch user details:", error);
      });
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/bookings/price', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`,
          },
        });
        const data = await response.json();
        setFormData(prevData => ({
          ...prevData,
          amount: data.price, // Set the price from the backend as the amount
        }));
      } catch (error) {
        console.error('Failed to fetch the price:', error);
      }
    };
    fetchPrice();
  }, []); // This runs once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/api/bookings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Booking successful:', data);
        Cookies.set('token', data.token, { path: '/', domain: 'localhost' });
        navigate('/payment', { state: { ...formData } });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bookingPage">
      <div className="bookingContainer">
        <h1>Book a Room</h1>
        <form className="bookingForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <div className="dateTimeContainer">
            <div>
              <label>Arrival Date & Time</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Departure Date & Time</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="guestContainer">
            <div>
              <label>Number of Children</label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div>
              <label>Number of Adults</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
          <div className="amountContainer">
            <h3>Amount to Pay: ${formData.amount}</h3> {/* Display amount as text */}
          </div>
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
