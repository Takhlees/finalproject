import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleApprove = (id) => {
    axios.post(`/api/bookings/approve/${id}`)
      .then(() => {
        setBookings(bookings.map(booking =>
          booking.id === id ? { ...booking, status: 'Approved' } : booking
        ));
      })
      .catch(error => console.error('Error approving booking:', error));
  };

  const handleReject = (id) => {
    axios.post(`/api/bookings/reject/${id}`)
      .then(() => {
        setBookings(bookings.map(booking =>
          booking.id === id ? { ...booking, status: 'Rejected' } : booking
        ));
      })
      .catch(error => console.error('Error rejecting booking:', error));
  };

  return (
    <div>
      <h1>Manage Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Room No</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.roomNo}</td>
              <td>{booking.status}</td>
              <td>
                <button onClick={() => handleApprove(booking.id)}>Approve</button>
                <button onClick={() => handleReject(booking.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
