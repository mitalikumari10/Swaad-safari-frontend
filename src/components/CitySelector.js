import React, { useContext } from 'react';
import { Context } from '..';
import './CitySelector.css';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useContext(Context);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="city-selector">
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="Jabalpur">Jabalpur, Madhya Pradesh</option>
        <option value="Kolkata">Kolkata, West Bengal</option>
      </select>
    </div>
  );
};

export default CitySelector;
