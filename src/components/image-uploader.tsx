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

  const handleRemoveImage = () => {
    setPreviewUrl(''); // Clear the preview
    onImageUpload(''); // Send an empty string to indicate no image
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <label className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300">
          {previewUrl ? 'Replace Image' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {previewUrl && (
          <button
            onClick={handleRemoveImage}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300"
          >
            Remove Image
          </button>
        )}
      </div>

      {previewUrl && (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-2">
          <img src={previewUrl} alt="Uploaded Preview" className="max-w-full rounded-md" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
