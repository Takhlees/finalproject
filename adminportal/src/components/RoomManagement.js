// RoomManagement.js
import React from 'react';

const RoomManagement = () => {
    return (
        <div className="table-container">
            <h2>Room Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>101</td>
                        <td>Deluxe</td>
                        <td>Available</td>
                        <td>$100</td>
                        <td><button>Edit</button></td>
                    </tr>
                    {/* More rows */}
                </tbody>
            </table>
        </div>
    );
};

export default RoomManagement;
