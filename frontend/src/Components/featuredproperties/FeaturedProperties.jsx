import "./FeaturedProperties.css"

const FeaturedProperties = () => {
    return (
      <div className="fp">
        <div className="fpItem">
          <img
            src="/Assets/images/img4.webp"
            alt=""
            className="fpImg"
          />
          <span className="fpName">Aparthotel Stare Miasto</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Starting from $120</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="/Assets/images/img5.jpg"
            alt=""
            className="fpImg"
          />
          <span className="fpName">Comfort Suites Airport</span>
          <span className="fpCity">Austin</span>
          <span className="fpPrice">Starting from $140</span>
          <div className="fpRating">
            <button>9.3</button>
            <span>Exceptional</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="/Assets/images/img6.jpg"
            alt=""
            className="fpImg"
          />
          <span className="fpName">Four Seasons Hotel</span>
          <span className="fpCity">Lisbon</span>
          <span className="fpPrice">Starting from $99</span>
          <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="/Assets/images/img7.jpg"
            alt=""
            className="fpImg"
          />
          <span className="fpName">Hilton Garden Inn</span>
          <span className="fpCity">Berlin</span>
          <span className="fpPrice">Starting from $105</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
    );
  };
  

export default FeaturedProperties
