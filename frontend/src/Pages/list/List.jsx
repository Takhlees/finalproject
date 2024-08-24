import "./List.css";
import Navbar from "../../Components/navbar/Navbar";

import {  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchItem from "../../Components/searchitem/SearchItem";

const List = () => {
  const navigate = useNavigate(); // Import and use navigate
  const [hotels, setHotels] = useState([]); // State to store fetched hotels
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:4000/api/rooms/') 
      .then(response => response.json())
      .then(data => {
        
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleHotelClick = (id) => {
    navigate(`/hotels/${id}`); // Navigate to the hotel details page
  };

  return (
    <div>
      <Navbar />
     
          <div className="listResult">
            {loading ? (
              <p>Loading...</p>
            ) : (
              hotels.map((hotel) => (
                <SearchItem
                  key={hotel._id}
                  hotel={hotel}
                  onClick={() => handleHotelClick(hotel._id)}
                />
              ))
            )}
          </div>
        </div>
     
  );
};

export default List;
