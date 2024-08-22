import "./SearchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/hotels/${hotel.id}`); // Navigate to the hotel details page with hotel ID
  };

  return (
    <div className="searchItem">   
      <img src={hotel.imageUrl} alt={`Room ${hotel.roomNo}`} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Room No: {hotel.roomNo}</h1>
        <span className="siPrice">Price: ${hotel.pricePerDay} per day</span>
        <span className="siStatus">Status: {hotel.status}</span>
      </div>
      <div className="siDetails">
        <button className="siCheckButton" onClick={handleDetailsClick}>See details</button>
      </div>
    </div>
  );
};

export default SearchItem;
