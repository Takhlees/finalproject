import "./SearchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/hotels/${hotel.id}`); // Navigate to the hotel details page with hotel ID
  };

  return (
    <div className="searchItem">   
      <img src={hotel.imageUrl} alt={hotel.title} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.title}</h1>
        <span className="siDistance">{hotel.distance}</span>
        <span className="siTaxiOp">{hotel.taxiOp}</span>
        <span className="siSubtitle">{hotel.subtitle}</span>
        <span className="siFeatures">{hotel.features}</span>
        <span className="siCancelOp">{hotel.cancelOp}</span>
        <span className="siCancelOpSubtitle">{hotel.cancelOpSubtitle}</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{hotel.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{hotel.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleDetailsClick}>See details</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
