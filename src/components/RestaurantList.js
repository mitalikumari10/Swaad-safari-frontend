import React from 'react';

const RestaurantList = ({ restaurants }) => {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant._id}>
          <h3>{restaurant.info.name}</h3>
          <p>{restaurant.info.locality}</p>
          <p>{restaurant.info.costForTwo}</p>
          <p>{restaurant.info.cuisines.join(', ')}</p>
          <p>{restaurant.info.avgRating}</p>
          <p>{restaurant.info.veg ? 'Veg' : 'Non-Veg'}</p>
          <img src={restaurant.info.resimage} alt={restaurant.info.name} width="200" />
          <pre>{JSON.stringify(restaurant.info.menu, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
