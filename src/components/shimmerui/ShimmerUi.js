// ShimmerUi.jsx
import React from 'react';
import './ShimmerUi.css';

const ShimmerUi = ({ numberOfShimmers, type }) => {
  // Render shimmer effect based on the type prop
  const renderShimmerEffect = () => {
    if (type === "filter-btn") {
      return (
        <div className="shimmer-filter-btn">
          <div className="shimmer"></div>
        </div>
      );
    } else {
      // Default shimmer effect for cards
      const shimmerCards = Array.from({ length: numberOfShimmers }, (_, index) => index + 1);
      return (
        <div className="shimmer-container">
          {shimmerCards.map((index) => (
            <div key={index} className="shimmer-card">
              <div className="shimmer-image"></div>
              <div className="shimmer-info">
                <div className="shimmer-title"></div>
                <div className="shimmer-details"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return renderShimmerEffect();
};

export default ShimmerUi;
