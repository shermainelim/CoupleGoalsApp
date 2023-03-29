import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "../screens/welcome/Welcome";
import Register from "../screens/register/Register";
import LoginOptions from "../screens/login/loginOptions";
import FirstPersonLogin from "../screens/login/firstPersonLogin";
import SecondPersonLogin from "../screens/login/secondPersonLogin";
import Dashboard from "../screens/dashboard/Dashboard";
import FirstTimeDashboard from "../screens/dashboard/firstTimeDashboard.jsx";


const AppNavigator = () => {
  return (
    <Router>
     

      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loginOptions" element={<LoginOptions/>} />
      <Route path="/firstPersonLogin" element={<FirstPersonLogin/>} />
      <Route path="/secondPersonLogin" element={<SecondPersonLogin/>} />
      <Route path="/firstTimeDashboard" element={<FirstTimeDashboard/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
  
      </Routes>
    </Router>
  );
};

export default AppNavigator;
