
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navrbar';
import Webcam from 'react-webcam';

const RegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitLocation, setVisitLocation] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [checkInMessage, setCheckInMessage] = useState('');
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    // Set the check-in message when registering
    const checkInTime = new Date().toLocaleString();
    setCheckInMessage(`Check-in successful! You checked in at ${checkInTime}`);

    // Create user data object
    const userData = {
      fullName,
      email,
      idNumber,
      phoneNumber,
      visitLocation,
      checkInTime,
      imageSrc,
    };

    // Navigate to the check-in confirmation page after registration
    navigate('/check-in', { state: { userData } });
  };

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Where are you visiting?"
            value={visitLocation}
            onChange={(e) => setVisitLocation(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Webcam for live image capture */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4"
          />
          <button onClick={capture} className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 w-full mb-4">
            Capture Image
          </button>

          {imageSrc && (
            <div className="mb-4">
              <img src={imageSrc} alt="Captured" className="rounded mb-2" />
            </div>
          )}

          {/* INFORMATION Section */}
          <div className="mt-6 bg-gray-700 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Your INFORMATION:</h2>
            <p><strong>Full Name:</strong> {fullName || 'N/A'}</p>
            <p><strong>Email:</strong> {email || 'N/A'}</p>
            <p><strong>ID Number:</strong> {idNumber || 'N/A'}</p>
            <p><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</p>
            <p><strong>Visit Location:</strong> {visitLocation || 'N/A'}</p>
            {imageSrc && <img src={imageSrc} alt="Captured" className="rounded mt-2 mb-2" />}
          </div>

          <button
            onClick={handleRegister}
            className="mt-6 bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 w-full"
          >
            Register
          </button>

          {/* Check-in message display */}
          {checkInMessage && <p className="mt-4 text-green-400">{checkInMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
