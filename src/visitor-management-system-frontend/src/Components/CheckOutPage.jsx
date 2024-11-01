
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navrbar';

const CheckOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const userData = location.state?.userData;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-orange-500">Check-Out</h1>
        {userData ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Goodbye, {userData.fullName}!</h2>
            <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
            <p className="mb-2"><strong>ID Number:</strong> {userData.idNumber}</p>
            <p className="mb-2"><strong>Phone Number:</strong> {userData.phoneNumber}</p>
            <p className="mb-4"><strong>Purpose:</strong> {userData.purpose}</p>
            <p className="text-lg">You have successfully checked out!</p>
          </div>
        ) : (
          <p className="text-lg">No user data found. Please check in first.</p>
        )}
        <button
          onClick={handleBack}
          className="mt-6 bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
