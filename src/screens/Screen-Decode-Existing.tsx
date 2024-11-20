import React, { useState } from 'react';
import ImageUploader from '../components/image-uploader.tsx';

export default function DecodeExistingScreen({ onScreenChange }) {
  // State Variables
  const [currentUploadedImageDataURL, setCurrentUploadedImageDataURL] = useState<string>('');

  // handle functions
  function handleImageChange(imageURL: string) {
    setCurrentUploadedImageDataURL(imageURL);
  }

  return (
    <>
      <h1>Welcome back, friend.</h1>
      <button
        className="home-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
        onClick={() => onScreenChange('home')}
      >
        Home
      </button>
      <ImageUploader onImageUpload={handleImageChange} />
    </>
  );
}
