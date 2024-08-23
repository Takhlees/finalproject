import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/home/Home";
import Hotel from "./Pages/hotel/Hotel";
import Booking from "./Pages/booking/Booking";
import Payment from "./Pages/payment/Payment";
import BookingConfirmation from "./Pages/bookingconfirmation/BookingConfirmation";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import List from "./Pages/list/List";
import Contact from "./Pages/contact/Contact";
import Review from "./Pages/review/Review";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/booking/:roomId" element={<Booking/>} />
        <Route path="/hotels" element={<List/>}/>
        <Route path="/payment" element={<Payment/>} />
        <Route path="/hotel/:_id/review" element={<Review/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/bookingconfirmation" element={<BookingConfirmation/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
