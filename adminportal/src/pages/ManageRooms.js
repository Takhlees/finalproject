import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/rooms/')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div>
      <h1>Manage Rooms</h1>
      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td>{room.status}</td>
              <td>
                {/* Add View/Update/Delete functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRooms;
