import { faBed, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Attractions</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Unlock a world of discounts!</h1>
            <p className="headerDesc">
              Sign up for a free TIERS booking account and enjoy instant savings
              of 10% or more on your bookings.
            </p>
            <button className="headerBtn" onClick={handleSearch}>
              Book your room
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
