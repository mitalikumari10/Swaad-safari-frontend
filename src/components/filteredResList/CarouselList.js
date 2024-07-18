import React, { useContext, useEffect, useState } from 'react';
import RestaurantCard from '../rescard/Rescard';
import { useLocation } from 'react-router-dom';
import './CarouselList.css'; // Add appropriate styles
import { Context } from '../..'; // Adjust the import based on your project structure
import axios from 'axios';

const CarouselList = () => {
    const location = useLocation();
    const { dishName } = location.state || { dishName: '' };
    const { selectedCity } = useContext(Context); // Use selectedCity from context
    const [searchResults, setSearchResults] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/all?city=${selectedCity}`);
            setSearchResults(response.data.doc);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, [selectedCity]); // Re-fetch data whenever selectedCity changes

    return (
        <div className="carousel-list-container">
            <h1>{dishName}</h1>
            <p>Experience the authentic taste of mouth-watering dishes.</p>
            {/* Add filters here */}
            <div className="filters">
                {/* Your filter components */}
            </div>
            <div className="restaurant-list">
                {searchResults.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default CarouselList;
