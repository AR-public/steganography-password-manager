import React from 'react';

export default function DecodeExistingScreen({ onScreenChange }) {
  return (
    <>
      <h1>Welcome back, friend.</h1>
      <button onClick={() => onScreenChange('home')}>Home</button>
    </>
  );
}
