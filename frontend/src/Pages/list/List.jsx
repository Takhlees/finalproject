import "./List.css";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../Components/searchitem/SearchItem";

const List = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Import and use navigate
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const hotels = [
    {
      id: 1,
      imageUrl: "/Assets/images/img8.webp", 
      title: "Comfort Suite",
      distance: "500m from lobby",
      taxiOp: "Free airport taxi",
      subtitle: "Cozy Suite with Air Conditioning",
      features: "Entire suite • 1 bathroom • 21m² • 1 full bed",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "You can cancel later, so lock in this great price today!",
      rating: 8.9,
      price: "$112",
    },
    {
      id: 2,
      imageUrl: "/Assets/images/img9.webp", 
      title: "Luxury Ocean View Suite",
      distance: "1km from lobby",
      taxiOp: "Free city taxi",
      subtitle: "Spacious Suite with Ocean View",
      features: "Entire suite • 2 bathrooms • 50m² • 2 king beds",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "Book now and pay later!",
      rating: 9.2,
      price: "$250",
    },
    {
      id: 3,
      imageUrl: "/Assets/images/img10.jpg",
      title: "Deluxe City View Room",
      distance: "300m from lobby",
      taxiOp: "Free breakfast",
      subtitle: "Elegant Room with City View",
      features: "Room • 1 bathroom • 30m² • 1 king bed",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "Book with confidence!",
      rating: 8.7,
      price: "$180",
    },
    {
      id: 4,
      imageUrl: "/Assets/images/img11.jpg",
      title: "Beachfront Suite",
      distance: "2km from lobby",
      taxiOp: "Free shuttle service",
      subtitle: "Suite with Private Balcony",
      features: "Suite • 2 bathrooms • 45m² • 1 queen bed",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "Enjoy flexible booking options.",
      rating: 9.0,
      price: "$275",
    },
    {
      id: 5,
      imageUrl: "/Assets/images/img12.webp",
      title: "Modern Skyline Room",
      distance: "700m from lobby",
      taxiOp: "Complimentary breakfast",
      subtitle: "Contemporary Room with Skyline View",
      features: "Room • 1 bathroom • 25m² • 1 full bed",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "Secure your stay today!",
      rating: 8.5,
      price: "$260",
    },
    {
      id: 6,
      imageUrl: "/Assets/images/img13.jpg",
      title: "Mountain View Cabin",
      distance: "5km from lobby",
      taxiOp: "Free parking",
      subtitle: "Cozy Cabin with Mountain View",
      features: "Cabin • 1 bathroom • 35m² • 2 twin beds",
      cancelOp: "Free cancellation",
      cancelOpSubtitle: "Perfect for a peaceful getaway.",
      rating: 9.1,
      price: "$200",
    },
  ];
  

  const handleHotelClick = (id) => {
    navigate(`/hotels/${id}`); // Navigate to the hotel details page
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {hotels.map((hotel) => (
              <SearchItem key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
