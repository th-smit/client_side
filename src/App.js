import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailSend from "./pages/EmailSend";
import OtpVerify from "./pages/OtpVerify";
import ForgotPassword from "./pages/ForgotPassword";
//import MailState from "./context/MailState";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/emailsend" element={<EmailSend />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/otpverify" element={<OtpVerify />}></Route>
    </Routes>
  );
}

export default App;
