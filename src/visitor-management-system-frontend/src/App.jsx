
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage'; 
import Navbar from './Components/Navrbar';
import CheckInPage from './Components/CheckInpage'; 
import CheckOutPage from './Components/CheckOutPage';
import RegisterPage from './Components/RegisterPage';
import axiosInstance from './axiosInstance';
//import visitor-management-system-backend  from './vistor-management-system-backend';

//console.log("vistor-management-system-backend",vistor-management-system-backend);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/Navbar" element={<Navbar />} />
       
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/check-out" element={<CheckOutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
