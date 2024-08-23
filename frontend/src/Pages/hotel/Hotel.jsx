import "./Hotel.css";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import MailList from "../../Components/maillist/MailList";
import Footer from "../../Components/footer/Footer";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/rooms/${id}`);
        const data = await response.json();

        setHotel(data);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  const handleAddReview = () => {
    navigate(`/hotel/${id}/review`);
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="sliderWrapper">
          <img src={hotel.image} alt="" className="sliderImg" />
        </div>

        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBooking}>
            Book Now!
          </button>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <div className="hotelRoomDetails">
                <p>
                  Room Number: <span>{hotel.number}</span>
                </p>
                <p>
                  Room Type: <span>{hotel.type}</span>
                </p>
                <p>
                  Room Description: <span>{hotel.description}</span>
                </p>
                <p>
                  Status: <span>{hotel.status}</span>
                </p>
                <p>
                  Price per Day: <span>${hotel.price}</span>
                </p>
              </div>
              <button className="addReview" onClick={handleAddReview}>
                Add a Review
              </button>
            </div>
          </div>
        </div>

        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
