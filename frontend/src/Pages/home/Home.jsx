import FeaturedProperties from "../../Components/featuredproperties/FeaturedProperties";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailList from "../../Components/maillist/MailList";
import Navbar from "../../Components/navbar/Navbar";
import PropertyList from "../../Components/propertyList/PropertyList";

import "./Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Browse by room type</h1>
        <PropertyList />
        <h1 className="homeTitle">Rooms Our Guests Love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
