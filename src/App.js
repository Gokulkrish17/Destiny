import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./admindashboard/dashboard";
import Email from "./admindashboard/email";
import Message from "./admindashboard/message";
import UserList from "./admindashboard/userlist";
import "./App.css";
import "./styles.css";
import UserDetails from "./admindashboard/userdetails";
import OtpDetails from "./admindashboard/otpdetails";
import SystemSettings from "./admindashboard/settings/systemsetting";
import AdminHealthChecker from "./admindashboard/admin";
import SignIn from "./admindashboard/Login/signin";
import LoggedInProfie from "./admindashboard/settings/loggedinprofile";
import LoginDetails from "./admindashboard/settings/logindetails";
import AdminProfile from "./admindashboard/Admin/adminprofile";
import AdminDetails from "./admindashboard/Admin/admindetails";
import ForgetPassword from "./admindashboard/Login/forgetpassword";
import ResetPassword from "./admindashboard/Login/resetpassword";
import PrivateRoute from "./admindashboard/Login/privateroute";
import CountryCode from "./admindashboard/Admin/Countrycode";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dial" element={<CountryCode />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/email" element={<Email />} />
                <Route path="/message" element={<Message />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/user/:email/detail" element={<UserDetails />} />
                <Route path="/otp/:email/detail" element={<OtpDetails />} />
                <Route path="/system_settings" element={<SystemSettings />} />
                <Route path="/health_check" element={<AdminHealthChecker />} />
                <Route path="/logged_user-profile" element={<LoggedInProfie />} />
                <Route path="/logged_user/:email/detail" element={<LoginDetails />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/admin-profile/:email" element={<AdminDetails />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
