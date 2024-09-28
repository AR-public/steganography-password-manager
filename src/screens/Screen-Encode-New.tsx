import React, { useState } from 'react';
import ImageUploaderComponent from '../components/image-uploader.tsx';
import DisplayUserImage from '../components/image-display.tsx';
import CredentialsForm from '../components/credentials-form.tsx';
import { ImageListType } from 'react-images-uploading';

export default function EncodeNewScreen({ onScreenChange }) {
  // Initialise State Variables
  const [currentUploadedImage, setCurrentUploadedImage] = useState<ImageListType>([]);

  const handleImageChange = (image: ImageListType) => {
    setCurrentUploadedImage(image);
  };

  return (
    <div>
      <h1>You must be new here. Welcome</h1>
      <div className="ImageEncoder">
        <button onClick={() => onScreenChange('home')}>Home</button>
        <ImageUploaderComponent latestUploadedImage={handleImageChange} />
        {currentUploadedImage[0] && (
          <>
            <DisplayUserImage currentUploadedImage={currentUploadedImage} />
            <h2>Login Credentials</h2>
            <CredentialsForm />
          </>
        )}
      </div>
    </div>
  );
}
