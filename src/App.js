import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from "./admindashboard/dashboard";
import Email from "./admindashboard/email";
import Message from "./admindashboard/message";
import UserList from "./admindashboard/userlist";
import "./App.css"
import "./styles.css"
import UserDetails from "./admindashboard/userdetails";
import System from "./admindashboard/system";

function App() {
  return (

    <Router>

       <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/email" element={<Email/>}/>
        <Route path="/fetchuser" element={<fetchUserProfile/>}/>
        <Route path="/fetch-userdata" element={<fetchUserdata/>}/>
        <Route path="/message" element={<Message/>}/>
        <Route path="/userlist" element={<UserList/>}/>
        <Route path="/user/:email/detail" element={<UserDetails/>}/>
        <Route path="/system" element={<System/>}/>
        </Routes> 
        
    </Router>
    
  );
}

export default App;
