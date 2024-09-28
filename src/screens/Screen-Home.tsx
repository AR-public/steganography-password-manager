import React, { useEffect } from 'react';

export default function HomeScreen({ onScreenChange }) {
  return (
    <>
      <h1>Welcome Gnome</h1>
      <button onClick={() => onScreenChange('encoding')}>Encode New Image</button>
      <button onClick={() => onScreenChange('decoding')}>Decode Image</button>
    </>
  );
}
