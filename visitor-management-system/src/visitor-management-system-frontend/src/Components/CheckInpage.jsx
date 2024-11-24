

import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navrbar';

const CheckInPage = () => {
  const { state } = useLocation();
  const userData = state.userData;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-orange-500 text-center">Check-In Confirmation</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl mb-4">Welcome, {userData.fullName}!</h2>
          <p>Check-in Time: {userData.checkInTime}</p>
          <p aria-required>Email: {userData.email}</p>
          <p>ID Number: {userData.idNumber}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Visit Location: {userData.visitLocation}</p>
          {userData.imageSrc && <img src={userData.imageSrc} alt="Captured" className="rounded mt-4" />}
        </div>
      </div>
    </div>
  );
};

export default CheckInPage;

