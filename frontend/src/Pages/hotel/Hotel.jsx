import "./Hotel.css";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import MailList from "../../Components/maillist/MailList";
import Footer from "../../Components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
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


  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? (hotel.photos.length - 1) : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

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
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBooking}>Book Now!</button>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <div className="hotelRoomDetails">
                <p>Room Number: <span>{hotel.number}</span></p>
                <p>Room Type: <span>{hotel.type}</span></p>
                <p>Room Description: <span>{hotel.description}</span></p>
                <p>Status: <span>{hotel.status}</span></p>
                <p>Price per Day: <span>${hotel.price}</span></p>
              </div>
              <button className="addReview" onClick={handleAddReview}>Add a Review</button>
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
