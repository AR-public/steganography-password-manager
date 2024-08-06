import React, { useState } from "react";
import './App.css';
import { ImageUploaderComponent } from './Components/image-uploader/image-uploader.tsx';
import { ImageListType } from "react-images-uploading";

function App() {

    const [uploadedImagePipedIntoAppComponent, setUploadedImagePipedIntoAppComponent] = useState<ImageListType>([]);
  
    const handleImageChange = (images: ImageListType) => {
      setUploadedImagePipedIntoAppComponent(images);
    };

    const extractBase64CodeFromImageUploader = (longURLFromImageUploader: string | undefined) => {
      if (longURLFromImageUploader===undefined)
        {console.error("Base 64 code from image not found"); return}
      
      const index = longURLFromImageUploader.indexOf(";base64,");
      
      try {  
            return longURLFromImageUploader.substring(index + ";base64,".length);
          }
      catch {console.error("Base 64 code from image not found")}
    }

  return (
    <div className="App">
      <div className="image-uploader-component-div">
        <ImageUploaderComponent onImageChange={handleImageChange} />
      </div>

      {uploadedImagePipedIntoAppComponent[0] && (
       <>
        <p>This is the uploaded image returned in the parent component</p>
        <img src={uploadedImagePipedIntoAppComponent[0].dataURL} alt="" width="300" onClick={()=>console.log(extractBase64CodeFromImageUploader(uploadedImagePipedIntoAppComponent[0].dataURL))} />
       </>
      )}
    </div>
  );
}

export default App;
