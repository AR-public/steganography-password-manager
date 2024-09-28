import React, { createContext, useContext, useEffect, useState } from 'react';
import HomeScreen from '../screens/Screen-Home.tsx';
import EncodeNewScreen from '../screens/Screen-Encode-New.tsx';
import DecodeExistingScreen from '../screens/Screen-Decode-Existing.tsx';

export default function ScreenRenderer() {
  const [activeScreen, setActiveScreen] = useState('home');

  const handleScreenChange = (newScreen: string) => {
    setActiveScreen(newScreen);
  };

  switch (activeScreen) {
    case 'home':
      return <HomeScreen onScreenChange={handleScreenChange} />;
    case 'encoding':
      return <EncodeNewScreen onScreenChange={handleScreenChange} />;
    case 'decoding':
      return <DecodeExistingScreen onScreenChange={handleScreenChange} />;
    default:
      return <HomeScreen onScreenChange={handleScreenChange} />;
  }
}
