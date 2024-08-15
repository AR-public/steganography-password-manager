import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUploaderComponent from './Components/image-uploader/image-uploader.tsx';
import { ImageListType } from 'react-images-uploading';

function App() {
  // Initialise State Variables
  const [currentUploadedImage, setCurrentUploadedImage] = useState<ImageListType>([]);
  const [base64ImageCode, setBase64ImageCode] = useState<string>('');

  const handleImageChange = (image: ImageListType) => {
    setCurrentUploadedImage(image);
  };

  const extractBase64CodeFromImageUploader = (
    longURLFromImageUploader: string | undefined
  ): string | undefined => {
    if (longURLFromImageUploader === undefined) {
      console.error('Base 64 code from image not found');
      return;
    }

    const index = longURLFromImageUploader.indexOf(';base64,');

    try {
      return longURLFromImageUploader.substring(index + ';base64,'.length);
    } catch {
      console.error('Base 64 code from image not found');
      return;
    }
  };

  useEffect(() => {
    if (currentUploadedImage[0]) {
      const base64Code = extractBase64CodeFromImageUploader(currentUploadedImage[0].dataURL);
      if (base64Code) {
        setBase64ImageCode(base64Code);
      }
    }
  }, [currentUploadedImage]);

  return (
    <div className="App">
      <div className="image-uploader-component-div">
        <ImageUploaderComponent latestUploadedImage={handleImageChange} />
      </div>

      {currentUploadedImage[0] && (
        <>
          <p>This is the uploaded image returned in the parent component</p>
          <img
            src={currentUploadedImage[0].dataURL}
            alt=""
            width="300"
            onClick={() => console.log(base64ImageCode)}
          />
          <p>Base64 Image Code: {base64ImageCode}</p>
        </>
      )}
    </div>
  );
}

export default App;
