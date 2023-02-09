import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailSend from "./pages/EmailSend";
import OtpVerify from "./pages/OtpVerify";
import ForgotPassword from "./pages/ForgotPassword";
import Protected from "./pages/Protected";
import AddMovie from "./pages/AddMovie";
import MovieDetails from "./pages/MovieDetails";
import EditMovieDetails from "./pages/EditMovieDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Protected Component={HomePage} />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/emailsend" element={<EmailSend />}></Route>
      <Route
        path="/forgotpassword"
        element={<Protected Component={ForgotPassword} />}
      ></Route>
      <Route
        path="/otpverify"
        element={<Protected Component={OtpVerify} />}
      ></Route>
      <Route path="/addmovie" element={<AddMovie />}></Route>
      <Route path="/moviedetails" element={<MovieDetails />}></Route>
      <Route path="/moviedetails/edit" element={<EditMovieDetails />}></Route>
    </Routes>
  );
}

export default App;
