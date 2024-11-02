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

        // Here, load or define your labeled face descriptors
        // Example: labeledDescriptors.push(new faceapi.LabeledFaceDescriptors('User1', [user1Descriptor]));

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

    setCheckoutLoading(true); // Set loading state
    setMatchError(''); // Clear any previous error messages
    console.log("Captured image for checkout:", imageSrc);

    // Show scanning message
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
      setMatchError('Face recognition failed. Please ensure your face is clearly visible.'); // Set error message
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div>Loading models...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          className="rounded-md mb-4"
        />
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading} // Disable button during checkout
          className={`w-full ${checkoutLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200`}
        >
          {checkoutLoading ? 'Processing...' : 'Checkout'}
        </button>
        {matchError && <p className="text-red-500 mt-4">{matchError}</p>} {/* Show error if any */}
      </div>
    </div>
  );
};

export default Checkout;
