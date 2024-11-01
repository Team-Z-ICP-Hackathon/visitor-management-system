
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navrbar';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const RegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [faceScanned, setFaceScanned] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; 
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setVideoEnabled(true);
      startFaceDetection(); 
    };

    loadModels();
  }, []);

  const startFaceDetection = () => {
    setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        const img = await faceapi.bufferToImage(imageSrc);
        const detections = await faceapi.detectAllFaces(
          img,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
          setFaceScanned(true);
        } else {
          setFaceScanned(false);
        }
      }
    }, 1000); // Check every second
  };

  const handleFaceScan = () => {
    if (fullName && email && idNumber && phoneNumber && purpose) {
      if (faceScanned) {
        alert('Face scan successful!');
      } else {
        alert('No face detected, please try again.');
      }
    } else {
      alert('Please fill in all fields before scanning your face.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!faceScanned) {
      alert('Please complete the face scan before submitting.');
      return;
    }

    const userData = {
      fullName,
      email,
      idNumber,
      phoneNumber,
      purpose,
      faceScanned,
    };

    console.log('User Data:', userData);
    navigate('/check-in'); 
  };

  const isFormFilled = fullName && email && idNumber && phoneNumber && purpose;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-orange-500">Registration</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="idNumber" className="block mb-2">ID Number</label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="purpose" className="block mb-2">Purpose</label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            {videoEnabled && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                videoConstraints={{ facingMode: 'user' }}
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleFaceScan}
            className={`bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 ${!isFormFilled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormFilled} 
          >
            Scan Face
          </button>
          <button
            type="submit"
            className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 ${!faceScanned ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!faceScanned} 
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
