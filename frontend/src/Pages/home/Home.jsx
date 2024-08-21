import FeaturedProperties from "../../Components/featuredproperties/FeaturedProperties"
import Footer from "../../Components/footer/Footer"
import Header from "../../Components/header/Header"
import MailList from "../../Components/maillist/MailList"
import Navbar from "../../Components/navbar/Navbar"
import PropertyList from "../../Components/propertyList/PropertyList"


import "./Home.css"

function Home () {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
        <h1 className="homeTitle">Browse by property type</h1>
       <PropertyList/>    
       <h1 className="homeTitle">Reserve a top-rated vacation rental</h1>
       <FeaturedProperties/>
       <MailList/>
       <Footer/>
        </div>
    </div>
  )
}

export default Home
