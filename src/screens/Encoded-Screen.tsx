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
        <button style={{ marginTop: '10px' }}>Save Image</button>
      </a>
    </>
  );
}
