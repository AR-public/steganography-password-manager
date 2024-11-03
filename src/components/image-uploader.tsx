import React, { useState } from 'react';

type ImageUploaderProps = {
  onImageUpload: (imageDataUrl: string) => void; // Callback function to pass the image data URL to the parent
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreviewUrl(dataUrl); // Set preview in the uploader
        onImageUpload(dataUrl); // Send image data URL to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Uploaded Preview"
          style={{ maxWidth: '100%', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
