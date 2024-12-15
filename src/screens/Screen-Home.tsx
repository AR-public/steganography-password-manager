import React, { useEffect } from 'react';

export default function HomeScreen({ onScreenChange }) {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome Home</h1>
      <button
        className="mr-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
        onClick={() => onScreenChange('encoding')}
      >
        Encode New Image
      </button>
      <button
        className="ml-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
        onClick={() => onScreenChange('decoding')}
      >
        Decode Image
      </button>
    </>
  );
}
