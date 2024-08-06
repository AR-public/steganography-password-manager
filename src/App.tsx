import React, { useState, useEffect } from "react";
import './App.css';
import { ImageUploaderComponent } from './Components/image-uploader/image-uploader.tsx';
import { ImageListType } from "react-images-uploading";

function App() {

  // Initialise State Variables
  const [uploadedImagePipedIntoAppComponent, setUploadedImagePipedIntoAppComponent] = useState<ImageListType>([]);
  const [base64ImageCode, setBase64ImageCode] = useState<string>("");

  // Handle image change from ImageUploaderComponent
  const handleImageChange = (images: ImageListType) => {
    setUploadedImagePipedIntoAppComponent(images);
  };

  // Extract base64 code from the image data URL
  const extractBase64CodeFromImageUploader = (longURLFromImageUploader: string | undefined): string | undefined => {
    if (longURLFromImageUploader === undefined) {
      console.error("Base 64 code from image not found");
      return;
    }

    const index = longURLFromImageUploader.indexOf(";base64,");
    
    try {  
      return longURLFromImageUploader.substring(index + ";base64,".length);
    } catch {
      console.error("Base 64 code from image not found");
      return;
    }
  };

  // Use effect to update base64ImageCode whenever the uploaded image changes
  useEffect(() => {
    if (uploadedImagePipedIntoAppComponent[0]) {
      const base64Code = extractBase64CodeFromImageUploader(uploadedImagePipedIntoAppComponent[0].dataURL);
      if (base64Code) {
        setBase64ImageCode(base64Code);
      }
    }
  }, [uploadedImagePipedIntoAppComponent]);

  return (
    <div className="App">
      <div className="image-uploader-component-div">
        <ImageUploaderComponent onImageChange={handleImageChange} />
      </div>

      {uploadedImagePipedIntoAppComponent[0] && (
       <>
        <p>This is the uploaded image returned in the parent component</p>
        <img 
          src={uploadedImagePipedIntoAppComponent[0].dataURL} 
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
