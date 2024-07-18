// src/components/DinoGame.js

import React from 'react';

const DinoGame = () => {
  return (
    <iframe
      title="Dino Game"
      src="/game.html" // Ensure this path matches where you placed your Dino game files
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
};

export default DinoGame;
