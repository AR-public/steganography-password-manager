import React from 'react';
import { ImageListType } from 'react-images-uploading';

interface Props {
  currentUploadedImage: ImageListType;
}

function DisplayUserImage({ currentUploadedImage }: Props) {
  console.log('currentUploadedImage:', currentUploadedImage);
  return <img src={currentUploadedImage[0]?.dataURL} alt="Uploaded Image" width="800" />;
}

export default DisplayUserImage;
