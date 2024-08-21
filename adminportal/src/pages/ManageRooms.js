import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRooms.css'; // Import the CSS file

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [roomForm, setRoomForm] = useState({
    number: '',
    type: '',
    servantName: '',
    servantContact: '',
    price: '',
    image: '',
    description: '',
    status: ''
  });
  const [roomHistory, setRoomHistory] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setRoomForm(room);
    setIsEditing(true);
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`/api/rooms/${roomId}`);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedRoom) {
        await axios.put(`/api/rooms/${selectedRoom.id}`, roomForm);
      } else {
        await axios.post('/api/rooms', roomForm);
      }
      fetchRooms();
      setIsEditing(false);
      setRoomForm({
        number: '',
        type: '',
        servantName: '',
        servantContact: '',
        price: '',
        image: '',
        description: '',
        status: ''
      });
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleRoomClick = async (roomId) => {
    try {
      const response = await axios.get(`/api/rooms/${roomId}/history`);
      setRoomHistory(response.data);
    } catch (error) {
      console.error('Error fetching room history:', error);
    }
  };

  return (
    <div className="container">
      <h1>Manage Rooms</h1>
      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Servant Name</th>
            <th>Servant Contact</th>
            <th>Price/Per Day</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id} onClick={() => handleRoomClick(room.id)}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.servantName}</td>
              <td>{room.servantContact}</td>
              <td>{room.price}</td>
              <td><img src={room.image} alt="Room" /></td>
              <td>{room.description}</td>
              <td>{room.status}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(room)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div>
          <h2>{selectedRoom ? 'Edit Room' : 'Add New Room'}</h2>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <input
              type="text"
              value={roomForm.number}
              onChange={e => setRoomForm({ ...roomForm, number: e.target.value })}
              placeholder="Room No"
            />
            <input
              type="text"
              value={roomForm.type}
              onChange={e => setRoomForm({ ...roomForm, type: e.target.value })}
              placeholder="Room Type"
            />
            <input
              type="text"
              value={roomForm.servantName}
              onChange={e => setRoomForm({ ...roomForm, servantName: e.target.value })}
              placeholder="Servant Name"
            />
            <input
              type="text"
              value={roomForm.servantContact}
              onChange={e => setRoomForm({ ...roomForm, servantContact: e.target.value })}
              placeholder="Servant Contact"
            />
            <input
              type="number"
              value={roomForm.price}
              onChange={e => setRoomForm({ ...roomForm, price: e.target.value })}
              placeholder="Price/Per Day"
            />
            <input
              type="text"
              value={roomForm.image}
              onChange={e => setRoomForm({ ...roomForm, image: e.target.value })}
              placeholder="Image URL"
            />
            <textarea
              value={roomForm.description}
              onChange={e => setRoomForm({ ...roomForm, description: e.target.value })}
              placeholder="Description"
            />
            <select
              value={roomForm.status}
              onChange={e => setRoomForm({ ...roomForm, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <button type="submit">Save</button>
          </form>
        </div>
      )}

      {selectedRoom && (
        <div className="room-history">
          <h2>Room History</h2>
          <table>
            <thead>
              <tr>
                <th>Arrival Date</th>
                <th>Departure Date</th>
                <th>Person Info</th>
              </tr>
            </thead>
            <tbody>
              {roomHistory.map(history => (
                <tr key={history.id}>
                  <td>{history.arrivalDate}</td>
                  <td>{history.departureDate}</td>
                  <td>{history.personInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
