import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface ImageUploaderComponentProps {
  latestUploadedImage: (image: ImageListType) => void;
}

const ImageUploaderComponent: React.FC<ImageUploaderComponentProps> = ({ latestUploadedImage }) => {
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList);
    latestUploadedImage(imageList);
  };

  return (
    <div className="ImageUploaderComponent">
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({
          imageList,
          onImageUpload,
          // onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img src={image.dataURL} alt="" width="600" /> */}
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploaderComponent;
