import "./PropertyList.css";

const PropertyList = () => {
  return (
    <div className="pList">
      <div className="pListItem">
        <img
          src="/Assets/images/img1.webp"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Standard Rooms</h1>
          <h2>20 rooms</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="/Assets/images/img2.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Deluxe Rooms</h1>
          <h2>22 rooms</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="/Assets/images/img3.webp"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Suites</h1>
          <h2>20 suites</h2>
        </div>
      </div>
      
    </div>
  );
};

export default PropertyList;
