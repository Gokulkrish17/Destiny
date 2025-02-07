import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./admindashboard/Common/dashboard";
import Email from "./admindashboard/User/email";
import Message from "./admindashboard/User/message";
import UserList from "./admindashboard/User/userlist";
import "./App.css";
import "./styles.css";
import UserDetails from "./admindashboard/User/userdetails";
import OtpDetails from "./admindashboard/User/otpdetails";
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
import ArtistDetails from "./admindashboard/profession/artistDetail";
import ArtistInformation from "./admindashboard/profession/artistInformation";
import DashboardPage from "./admindashboard/User/dashboardpage";
import Promotion from "./admindashboard/User/promotion";
import Birthday from "./admindashboard/User/birthday";
import GeneralSetting from "./admindashboard/User/generalsetting";
import DeleteUser from "./admindashboard/User/deleteuser";

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
                <Route path="/artist-crew-details" element={<ArtistDetails/>} />
                <Route path="/artist/:id/detail" element={<ArtistInformation/>} />
                <Route path="/dashboard-page" element={<DashboardPage/>} />
                <Route path="/promotion" element={<Promotion/>} />
                <Route path="/birthday" element={<Birthday/>} />
                <Route path="/general-settings" element={<GeneralSetting/>} />
                <Route path="/delete-user" element={<DeleteUser />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
