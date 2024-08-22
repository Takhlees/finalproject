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
          <span className="fpName">Superior Room</span>
          <span className="fpCity">Children's playarea included</span>
          <span className="fpPrice">Starting from $60</span>
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
          <span className="fpName">Premiere Room</span>
          <span className="fpCity">Free welcome food</span>
          <span className="fpPrice">Starting from $100</span>
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
          <span className="fpName">Luxury Suite</span>
          <span className="fpCity">Breakfast included</span>
          <span className="fpPrice">Starting from $150</span>
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
          <span className="fpName">Executive Suite</span>
          <span className="fpCity">Breakfast included</span>
          <span className="fpPrice">Starting from $135</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
    );
  };
  

export default FeaturedProperties
