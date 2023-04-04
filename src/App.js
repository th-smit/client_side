import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailSend from "./pages/EmailSend";
import OtpVerify from "./pages/OtpVerify";
import ForgotPassword from "./pages/ForgotPassword";
import AddMovie from "./pages/AddMovie";
import MovieDetails from "./pages/MovieDetails";
import EditMovieDetails from "./pages/EditMovieDetails";
import UserDetails from "./pages/UserDetails";
import Protected from "./pages/Protected";
import BookShow from "./pages/BookShow";
import AddShow from "./pages/AddShow";
import BookTicket from "./pages/BookTicket";
import EditShow from "./pages/EditShow";
import MyBooked from "./pages/MyBooked";
import AddPromoCode from "./pages/AddPromoCode";
import PromoList from "./pages/PromoList";
import EditPromo from "./pages/EditPromo";
import Report from "./pages/Report";

function App() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route
          path="/bookshow/:title?/:currentdate?"
          element={<BookShow />}
        ></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/moviedetails/:title?" element={<MovieDetails />}></Route>
        <Route path="/bookticket/:id?" element={<BookTicket />}></Route>
      </Route>

      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route path="/addmovie" element={<AddMovie />}></Route>

      <Route path="/edit/:title?" element={<EditMovieDetails />}></Route>
      <Route path="/userdetails" element={<UserDetails />}></Route>

      <Route path="/addshow/:title?" element={<AddShow />}></Route>
      <Route path="/editshow" element={<EditShow />}></Route>

      <Route path="/mybooking" element={<MyBooked />}></Route>

      <Route path="/emailsend" element={<EmailSend />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/otpverify" element={<OtpVerify />}></Route>
      <Route path="/addpromocode" element={<AddPromoCode />}></Route>
      <Route path="/promocodelist" element={<PromoList />}></Route>
      <Route path="/editpromo/:id?" element={<EditPromo />}></Route>
      <Route path="/report" element={<Report />}></Route>
    </Routes>
  );
}

export default App;
