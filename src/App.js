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

function App() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/emailsend" element={<EmailSend />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/otpverify" element={<OtpVerify />}></Route>
        <Route path="/addmovie" element={<AddMovie />}></Route>
        <Route path="/moviedetails" element={<MovieDetails />}></Route>
        <Route path="/edit" element={<EditMovieDetails />}></Route>
        <Route path="/userdetails" element={<UserDetails />}></Route>
        <Route path="/bookticket" element={<BookTicket />}></Route>
        <Route path="/addshow" element={<AddShow />}></Route>
        <Route path="/editshow" element={<EditShow />}></Route>
        <Route path="/bookshow" element={<BookShow />}></Route>
        <Route path="/mybooking" element={<MyBooked />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
