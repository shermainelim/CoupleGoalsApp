import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "../screens/welcome/Welcome";
import Register from "../screens/register/Register";

const AppNavigator = () => {
  return (
    <Router>
     

      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
  
      </Routes>
    </Router>
  );
};

export default AppNavigator;
