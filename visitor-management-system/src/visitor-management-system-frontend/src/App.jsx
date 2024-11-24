import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Landing/LandingPage'; 
import Navbar from './Components/Navrbar';
import CheckInPage from './Components/CheckInpage'; 
import CheckOutPage from './Components/CheckOutPage';
import RegisterPage from './Components/RegisterPage';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import RegisteredVistore from './Components/Dashboard/RegisteredVisitors';
import UserManagement from './Components/Dashboard/UserManagement';
import axiosInstance from './axiosInstance';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="registered-visitors" element={<RegisteredVistore />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/check-out" element={<CheckOutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
