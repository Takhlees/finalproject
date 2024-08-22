import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRooms.css'; 

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [roomForm, setRoomForm] = useState({
    number: '',
    type: '',
    servantName: '',
    servantContact: '',
    price: '',
    image: '',
    description: '',
    status: 'Available'
  });
  const [roomHistory, setRoomHistory] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setRoomForm(room);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleDelete = async (room) => {
    try {
      await axios.delete(`http://localhost:4000/api/rooms/${room._id}`);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedRoom) {
        await axios.put(`http://localhost:4000/api/rooms/${selectedRoom._id}`, roomForm);
      } else {
        await axios.post('http://localhost:4000/api/rooms/', roomForm);
      }
      fetchRooms();
      setIsEditing(false);
      setIsAdding(false);
      setRoomForm({
        number: '',
        type: '',
        servantName: '',
        servantContact: '',
        price: '',
        image: '',
        description: '',
        status: 'Available'
      });
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleRoomClick = async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/rooms/`);
      setRoomHistory(response.data);
      setSelectedRoom(rooms.find(room => room.id === roomId));
    } catch (error) {
      console.error('Error fetching room history:', error);
    }
  };

  const handleAddNewRoom = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedRoom(null);
    setRoomForm({
      number: '',
      type: '',
      servantName: '',
      servantContact: '',
      price: '',
      image: '',
      description: '',
      status: 'Available'
    });
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setIsAdding(false);
    setRoomForm({
      number: '',
      type: '',
      servantName: '',
      servantContact: '',
      price: '',
      image: '',
      description: '',
      status: 'Available'
    });
  };

  return (
    <div className="container">
      <h1>Manage Rooms</h1>

      <button className="add-new" onClick={handleAddNewRoom}>Add New Room</button>

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
            <tr key={room.id}>
              <td onClick={() => handleRoomClick(room.id)}>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.servantName}</td>
              <td>{room.servantContact}</td>
              <td>{room.price}</td>
              <td><img src={room.image} alt="Room" className="room-image" /></td>
              <td>{room.description}</td>
              <td>{room.status}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(room)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(room._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isEditing || isAdding) && (
        <div className="room-form">
          <button className="close-button" onClick={handleCloseForm}>&times;</button>
          <h2>{selectedRoom ? 'Edit Room' : 'Add New Room'}</h2>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <input
              type="text"
              value={roomForm.number}
              onChange={e => setRoomForm({ ...roomForm, number: e.target.value })}
              placeholder="Room No"
              required
            />
            <select
              value={roomForm.type}
              onChange={e => setRoomForm({ ...roomForm, type: e.target.value })}
              required
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
            <input
              type="text"
              value={roomForm.servantName}
              onChange={e => setRoomForm({ ...roomForm, servantName: e.target.value })}
              placeholder="Servant Name"
              required
            />
            <input
              type="text"
              value={roomForm.servantContact}
              onChange={e => setRoomForm({ ...roomForm, servantContact: e.target.value })}
              placeholder="Servant Contact"
              required
            />
            <input
              type="number"
              value={roomForm.price}
              onChange={e => setRoomForm({ ...roomForm, price: e.target.value })}
              placeholder="Price/Per Day"
              required
            />
            <input
              type="text"
              value={roomForm.image}
              onChange={e => setRoomForm({ ...roomForm, image: e.target.value })}
              placeholder="Image URL"
              required
            />
            <textarea
              value={roomForm.description}
              onChange={e => setRoomForm({ ...roomForm, description: e.target.value })}
              placeholder="Description"
              required
            />
            <select
              value={roomForm.status}
              onChange={e => setRoomForm({ ...roomForm, status: e.target.value })}
              required
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <button className="save-button" type="submit">Save</button>
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
