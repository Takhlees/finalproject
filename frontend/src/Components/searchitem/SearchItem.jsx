import "./SearchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();
  
  const handleDetailsClick = () => {
    navigate(`/hotels/${hotel._id}`); 
  };

  return (
    <div className="searchItem">   
      <img src={hotel.image} alt={`Room ${hotel.number}`} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Room No: {hotel.number}</h1>
        <span className="siPrice">Price: ${hotel.price} per day</span>
        <span className="siStatus">Status: {hotel.status}</span>
      </div>
      <div className="siDetails">
        <button className="siCheckButton" onClick={handleDetailsClick}>See details</button>
      </div>
    </div>
  );
};

export default SearchItem;
