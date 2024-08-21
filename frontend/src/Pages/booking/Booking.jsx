import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    children: 0,
    adults: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/api/bookings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Booking successful:', data);
        localStorage.setItem('token' , data.token);
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
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
    </div>
  );
};

export default Booking;
