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
    title: "Tower Street Apartments",
    address: "Elton St 125 New York",
    distance: "500m from center",
    priceHighlight: "Book a stay over $114 at this property and get a free airport taxi",
    description: "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with air conditioning and free WiFi. The units come with hardwood floors and feature a fully equipped kitchenette with a microwave, a flat-screen TV, and a private bathroom with shower and a hairdryer. A fridge is also offered, as well as an electric tea pot and a coffee machine. Popular points of interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower. The nearest airport is John Paul II International Kraków–Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service.",
    price: 945,
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
    title: "Park Avenue Hotel",
    address: "Park Ave 456 New York",
    distance: "1km from center",
    priceHighlight: "Luxury Suite with Ocean view",
    description: "The Park Avenue Hotel offers a luxurious stay with a stunning ocean view. Located just 1km from the city center, this hotel provides a free city taxi service for added convenience. The Luxury Suite includes 2 bathrooms, a spacious 50m² area, and 2 king-sized beds. Guests can enjoy the comfort of this well-appointed suite and benefit from free cancellation with the option to book now and pay later.",
    price: 250,
    photos: [
      "/Assets/images/img22.jpeg",
      "/Assets/images/img23.jpg",
      "/Assets/images/img24.jpg"
    ],
  },
  {
    id: 3,
    title: "Grand Plaza Hotel",
    address: "Grand St 789 New York",
    distance: "300m from center",
    priceHighlight: "Deluxe Room with city view",
    description: "Situated 300 meters from the city center, the Grand Plaza Hotel is known for its deluxe room with a beautiful city view. The room features a single bathroom, covers 30m², and includes a king-sized bed. The hotel offers a free breakfast to start your day and assures a worry-free stay with its free cancellation policy. Book with confidence and enjoy the high rating of 8.7.",
    price: 180,
    photos: [
      "/Assets/images/img25.jpg",
      "/Assets/images/img26.jpg",
      "/Assets/images/img27.webp"
    ],
   
  },
  {
    id: 4,
    title: "Ocean View Resort",
    address: "Beach Rd 101 New York",
    distance: "2km from center",
    priceHighlight: "Beachfront Suite with private balcony",
    description: "The Ocean View Resort, located 2km from the city center, boasts a beachfront suite with a private balcony. This suite is perfect for those who appreciate scenic views and tranquility. It includes 2 bathrooms, covers 45m², and has a queen-sized bed. Enjoy the added benefits of free shuttle service and flexible booking options with free cancellation.",
    price: 275,
    photos: [
      "/Assets/images/img28.jpg",
      "/Assets/images/img29.jpg",
      "/Assets/images/img30.jpg"
    ],
    
  },
  {
    id: 5,
    title: "City Lights Hotel",
    address: "City St 202 New York",
    distance: "700m from center",
    priceHighlight: "Modern Room with skyline view",
    description: "The City Lights Hotel is ideally located 700 meters from the city center and offers a modern room with a captivating skyline view. The room includes 1 bathroom, is 25m² in size, and features a full-sized bed. Guests are treated to complimentary breakfast and can take advantage of free cancellation to secure their stay. This hotel is perfect for those looking to enjoy the city's vibrant atmosphere.",
    price: 260,
    photos: [
      "/Assets/images/img31.jpg",
      "/Assets/images/img32.webp",
      "/Assets/images/img33.webp"
    ],
   
  },
  {
    id: 6,
    title: "Mountain Retreat",
    address: "Mountain Rd 303 New York",
    distance: "5km from center",
    priceHighlight: "Cozy Cabin with mountain view",
    description: "Located 5km from the city center, Mountain Retreat offers a cozy cabin with a breathtaking mountain view. The cabin includes 1 bathroom, is 35m², and features 2 twin beds, making it ideal for a peaceful getaway. The hotel provides free parking and the option for free cancellation, ensuring a relaxing and convenient stay in the mountains.",
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
