import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Register from "../screens/Register";

import ChocolateBar from "../assets/chocolatebar.png";
import Welcome from "../screens/Welcome";

const AppNavigator = () => {
  return (
    <Router>
     
<Welcome/>
      <Routes>
   
        <Route path="/register" element={<Register />} />
  
      </Routes>
    </Router>
  );
};

export default AppNavigator;
