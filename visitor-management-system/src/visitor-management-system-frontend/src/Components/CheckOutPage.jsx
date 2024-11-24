
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axiosInstance from '../axiosInstance';
import * as faceapi from 'face-api.js';
import Navbar from './Navrbar';

const Checkout = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [matchError, setMatchError] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading models...");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/Modules/tiny_face_detector_model-shard1'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/Modules/face_landmark_68_model-shard1'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/Modules/face_recognition_model-shard1')
        ]);
        console.log("Models loaded successfully.");
        setLoading(false);
      } catch (error) {
        console.error("Error loading models:", error);
        alert("Failed to load face detection models.");
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  const recognizeFace = async (imageSrc) => {
    try {
      const img = await faceapi.fetchImage(imageSrc);
      const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        console.log("Face detected:", detections);
        const labeledDescriptors = []; // Populate with actual descriptors

        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(detections.descriptor);

        if (bestMatch && bestMatch.toString() !== 'unknown') {
          console.log("Match found:", bestMatch.toString());
          return { success: true, userId: bestMatch.toString() };
        } else {
          console.log("No match found.");
          return { success: false };
        }
      } else {
        console.log("No face detected.");
        return { success: false };
      }
    } catch (error) {
      console.error("Face recognition error:", error);
      return { success: false };
    }
  };

  const handleCheckout = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Failed to capture image. Please try again.");
      return;
    }

    setCheckoutLoading(true);
    setMatchError('');
    console.log("Captured image for checkout:", imageSrc);

    alert("Scanning your face... Please wait.");

    const recognitionResult = await recognizeFace(imageSrc);
    console.log("Recognition result:", recognitionResult);

    if (recognitionResult.success) {
      try {
        const response = await axiosInstance.post('/checkout', {
          image: imageSrc,
          userId: recognitionResult.userId
        });
        console.log("Checkout response:", response.data);
        alert('Checkout successful!');
      } catch (error) {
        console.error("Error during checkout:", error);
        alert('Checkout failed. Please try again.');
      } finally {
        setCheckoutLoading(false);
      }
    } else {
      alert('Face recognition failed. Please try again.');
      setMatchError('Face recognition failed. Please ensure your face is clearly visible.');
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div>Loading models...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-700 -600 p-4 flex flex-col"> {/* Set background color to match navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-indigo-600 text-white shadow-md">
        <Navbar /> {/* Fixed navbar at the top */}
      </div>
      <div className="flex flex-grow items-center justify-center pt-16"> {/* Adjusted padding to prevent overlap */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
          <div className="flex justify-center mb-4"> {/* Centering the webcam */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              className="rounded-md"
            />
          </div>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className={`w-full ${checkoutLoading ? 'bg-gray-400' : 'bg-orange-500'} text-black font-semibold py-2 rounded hover:bg-orange hover:text-orange-500 transition duration-200`}
          >
            {checkoutLoading ? 'Processing...' : 'Checkout'}
          </button>
          {matchError && <p className="text-red-500 mt-4 text-center">{matchError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
