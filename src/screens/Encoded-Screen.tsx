import React from 'react';

type EncodedScreenProps = {
  encodedImageDataURL: string;
};

export default function EncodedScreen({ encodedImageDataURL }: EncodedScreenProps) {
  return (
    <>
      <h1 className="text-3xl font-bold">Find your secrets... Concealed.</h1>
      <img
        src={encodedImageDataURL}
        alt="Encoded Preview"
        style={{ maxWidth: '100%', marginTop: '10px' }}
      />
      <a href={encodedImageDataURL} download="encoded_image.png">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
          style={{ marginTop: '10px' }}
        >
          Save Image
        </button>
      </a>
    </>
  );
}
