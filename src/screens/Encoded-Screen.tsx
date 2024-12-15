import React from 'react';

type EncodedScreenProps = {
  encodedImageDataURL: string;
};

export default function EncodedScreen({ encodedImageDataURL }: EncodedScreenProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find your secrets... Concealed.</h1>

      {/* Image Container */}
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4">
        <img src={encodedImageDataURL} alt="Encoded Preview" className="max-w-full rounded-md" />
      </div>

      {/* Save Button */}
      <a href={encodedImageDataURL} download="encoded_image.png">
        <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 mt-4">
          Save Image
        </button>
      </a>
    </div>
  );
}
