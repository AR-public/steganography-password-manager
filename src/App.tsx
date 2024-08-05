import React, { useState } from "react";
import './App.css';
import { ImageUploaderComponent } from './Components/image-uploader/image-uploader.tsx';
import { ImageListType } from "react-images-uploading";

function App() {

    const [parentImage, setParentImage] = useState<ImageListType>([]);
  
    const handleImageChange = (images: ImageListType) => {
      setParentImage(images);
    };

  return (
    <div className="App">
      <div className="image-uploader-component-div">
        <ImageUploaderComponent onImageChange={handleImageChange} />
      </div>

<p>This is the uploaded image returned in the parent component</p>

{parentImage[0] && (
        <img src={parentImage[0].dataURL} alt="" width="300" />
      )}
    </div>
  );
}

export default App;
