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
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    title: "Comfort Suite",
    address: "123 Comfort Ave, Downtown",
    distance: "500m from lobby",
    priceHighlight: "Book a stay over $114 and get a free airport taxi",
    description: "The Comfort Suite offers a cozy and well-equipped space with air conditioning and modern amenities. The suite includes a fully equipped kitchenette, flat-screen TV, and a private bathroom. Ideal for travelers seeking comfort and convenience close to the city center.",
    price: 112,
    photos: [
      "/Assets/images/img16.jpg",
      "/Assets/images/img17.jpg",
      "/Assets/images/img18.jpg",
      "/Assets/images/img19.jpg",
      "/Assets/images/img20.jpg",
      "/Assets/images/img21.jpg"
    ],
  },
  {
    id: 2,
    title: "Luxury Ocean View Suite",
    address: "123 Comfort Ave, Downtown",
    distance: "1km from lobby",
    priceHighlight: "Luxury Suite with ocean view",
    description: "The Luxury Ocean View Suite provides a spacious and luxurious experience with stunning ocean views. Featuring 2 bathrooms, a generous 50m² area, and 2 king-sized beds, this suite is perfect for those seeking extra comfort and elegance. Enjoy free city taxi service and the option to book now and pay later.",
    price: 250,
    photos: [
      "/Assets/images/img22.jpeg",
      "/Assets/images/img23.jpg",
      "/Assets/images/img24.jpg"
    ],
  },
  {
    id: 3,
    title: "Deluxe City View Room",
    address: "123 Comfort Ave, Downtown",
    distance: "300m from lobby",
    priceHighlight: "Deluxe Room with city view",
    description: "The Deluxe City View Room offers an elegant and comfortable stay with a beautiful view of the city. The room includes 1 bathroom, a king-sized bed, and covers 30m². Guests can enjoy free breakfast and the flexibility of free cancellation for a worry-free stay.",
    price: 180,
    photos: [
      "/Assets/images/img25.jpg",
      "/Assets/images/img26.jpg",
      "/Assets/images/img27.webp"
    ],
  },
  {
    id: 4,
    title: "Beachfront Suite",
    address: "123 Comfort Ave, Downtown",
    distance: "2km from lobby",
    priceHighlight: "Beachfront Suite with private balcony",
    description: "The Beachfront Suite offers a serene retreat with a private balcony and breathtaking beach views. This suite features 2 bathrooms, covers 45m², and includes a queen-sized bed. Enjoy the convenience of free shuttle service and flexible booking options with free cancellation.",
    price: 275,
    photos: [
      "/Assets/images/img28.jpg",
      "/Assets/images/img29.jpg",
      "/Assets/images/img30.jpg"
    ],
  },
  {
    id: 5,
    title: "Modern Skyline Room",
    address: "123 Comfort Ave, Downtown",
    distance: "700m from lobby",
    priceHighlight: "Modern Room with skyline view",
    description: "The Modern Skyline Room provides a contemporary stay with captivating city skyline views. The room includes 1 bathroom, is 25m² in size, and features a full-sized bed. Guests benefit from complimentary breakfast and free cancellation, perfect for enjoying the city's vibrant atmosphere.",
    price: 260,
    photos: [
      "/Assets/images/img31.jpg",
      "/Assets/images/img32.webp",
      "/Assets/images/img33.webp"
    ],
  },
  {
    id: 6,
    title: "Mountain View Cabin",
    address: "123 Comfort Ave, Downtown",
    distance: "5km from lobby",
    priceHighlight: "Cozy Cabin with mountain view",
    description: "The Mountain View Cabin offers a tranquil escape with stunning mountain views. Featuring 1 bathroom, 35m² of space, and 2 twin beds, this cabin is ideal for a peaceful getaway. Enjoy free parking and flexible cancellation options for a relaxing stay in the mountains.",
    price: 200,
    photos: [
      "/Assets/images/img34.jpg",
      "/Assets/images/img35.jpg",
      "/Assets/images/img36.jpg"
    ],
  },
];



const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams(); 
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    const foundHotel = hotels.find(hotel => hotel.id === parseInt(id));
    setHotel(foundHotel);
  }, [id]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

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
    navigate('/booking'); 
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
          <button className="bookNow" onClick={handleBooking}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotel.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            {hotel.distance}
          </span>
          <span className="hotelPriceHighlight">
            {hotel.priceHighlight}
          </span>
          <div className="hotelImages">
            {hotel.photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                {hotel.description}
              </p>
              <button className="addReview" onClick={handleAddReview}>Add a Review</button>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${hotel.price}</b> (9 nights)
              </h2>
              <button onClick={handleBooking}>Reserve or Book Now!</button>
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
