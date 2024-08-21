// BookingManagement.js
import React from 'react';

const BookingManagement = () => {
    return (
        <div className="booking-management">
            <h2>Booking Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Guest Name</th>
                        <th>Room Number</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#001</td>
                        <td>John Doe</td>
                        <td>101</td>
                        <td>2024-08-20</td>
                        <td>2024-08-25</td>
                        <td>Confirmed</td>
                        <td><button>View</button></td>
                    </tr>
                    {/* More rows */}
                </tbody>
            </table>
        </div>
    );
};

export default BookingManagement;
