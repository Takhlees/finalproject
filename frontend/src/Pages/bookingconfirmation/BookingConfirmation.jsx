import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location.state ;
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="bookingconfirmPage">
      <h1 className="confirmationTitle">Booking Confirmation</h1>
      <div className="confirmationContainer">
        <div className="confirmationDetails">
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Contact:</strong> {bookingDetails.contact}</p>
          <p><strong>Arrival Date & Time:</strong> {bookingDetails.arrivalDate} at {bookingDetails.arrivalTime}</p>
          <p><strong>Departure Date & Time:</strong> {bookingDetails.departureDate} at {bookingDetails.departureTime}</p>
          <p><strong>Number of Adults:</strong> {bookingDetails.adults}</p>
          <p><strong>Number of Children:</strong> {bookingDetails.children}</p>
          <p><strong>Payment Status:</strong> {bookingDetails.paymentStatus}</p>
          <p><strong>Amount Paid:</strong> ${bookingDetails.amount}</p>
          {bookingDetails.userId && <p><strong>User ID:</strong> {bookingDetails.userId}</p>}
          {bookingDetails.roomId && <p><strong>Room ID:</strong> {bookingDetails.roomId}</p>}
        </div>
        <div className="confirmationActions">
          <button onClick={handlePrint}>Print Confirmation</button>
          <button onClick={handleContactUs}>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
