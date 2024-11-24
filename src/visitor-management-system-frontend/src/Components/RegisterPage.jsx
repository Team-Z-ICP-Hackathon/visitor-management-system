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
  const [errors, setErrors] = useState({});
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    // Validate form inputs
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!idNumber.trim()) newErrors.idNumber = 'ID Number is required.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required.';
    if (!visitLocation.trim()) newErrors.visitLocation = 'Visit Location is required.';
    if (!imageSrc) newErrors.imageSrc = 'Please capture an image.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and navigate with data
    setErrors({});
    const checkInTime = new Date().toLocaleString();

    const userData = {
      fullName,
      email,
      idNumber,
      phoneNumber,
      visitLocation,
      checkInTime,
      imageSrc,
    };

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
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Input Fields */}
            <label htmlFor="">Enter Your Full Name:</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`mb-4 p-2 w-full text-black border ${
                errors.fullName ? 'border-red-500' : 'border-gray-600'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

            <label htmlFor="">Enter Your Email:</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-4 p-2 w-full text-black border ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label htmlFor="">Enter Your ID Number:</label>
            <input
              type="text"
              placeholder="414413412"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className={`mb-4 p-2 w-full text-black border ${
                errors.idNumber ? 'border-red-500' : 'border-gray-600'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              required
            />
            {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}

            <label htmlFor="">Enter Your Phone Number:</label>
            <input
              type="text"
              placeholder="+254-781-381-381"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`mb-4 p-2 w-full text-black border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

            <label htmlFor="">Enter Your Visit Location:</label>
            <input
              type="text"
              placeholder="Nairobi"
              value={visitLocation}
              onChange={(e) => setVisitLocation(e.target.value)}
              className={`mb-4 p-2 w-full text-black border ${
                errors.visitLocation ? 'border-red-500' : 'border-gray-600'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              required
            />
            {errors.visitLocation && <p className="text-red-500 text-sm">{errors.visitLocation}</p>}

            
            {/* Webcam for live image capture */}
            <label htmlFor="">Capture Your Image:</label>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="mb-4"
            />
            <button
              onClick={capture}
              type="button"
              className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 w-full mb-4"
            >
              Capture Image
            </button>
            {errors.imageSrc && <p className="text-red-500 text-sm">{errors.imageSrc}</p>}

            {/* Display Captured Image */}
            {imageSrc && (
              <div className="mb-4">
                <img src={imageSrc} alt="Captured" className="rounded mb-2" />
              </div>
            )}

            {/* Registration Button */}
            <button
              onClick={handleRegister}
              className="mt-6 bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
