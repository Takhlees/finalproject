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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/booking" element={<Booking/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/bookingconfirmation" element={<BookingConfirmation/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
