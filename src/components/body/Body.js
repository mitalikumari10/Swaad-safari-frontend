import React, { useState, useEffect, useContext } from "react";
import './Body.css';
import RestaurantCard from '../rescard/Rescard';
import ShimmerUi from "../shimmerui/ShimmerUi";
import WhatInYourMindCarousel from "../carouselhp/Carouselhp";
import TopResChain from "../topreschain/TopResChain";
import { Context } from "../.."; // Adjust the import based on your project structure

const Body = () => {
    const [resList, setResList] = useState([]);
    const [carouselData, setCarouselData] = useState([]);
    const [resChain, setResChain] = useState([]);
    const { selectedCity } = useContext(Context); // Use selectedCity from context

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/all?city=${selectedCity}`);
            const data = await response.json();
            console.log(data);

            if (data && Array.isArray(data.doc)) {
                const formattedData = data.doc.map(restaurant => {
                    return {
                        ...restaurant,
                        info: restaurant.info
                    };
                });

                setResList(formattedData);
                setCarouselData(formattedData);
                const filteredResChain = formattedData.filter(restaurant => restaurant.info.avgRating >= 4);
                setResChain(filteredResChain);
            } else {
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCity]); // Re-fetch data whenever selectedCity changes

    return resList.length === 0 ? (
        <>
            <ShimmerUi numberOfShimmers={1} />
            <ShimmerUi numberOfShimmers={10} />
        </>
    ) : (
        <div className="body">
            <WhatInYourMindCarousel title="What's on your mind?" data={carouselData} />
            
            <TopResChain data={resChain} city={selectedCity} /> 
            <div className="restitle">Restaurants with online food delivery in {selectedCity}</div>
            <div className="outer">
                <div className='restaurant-list'>
                    {resList.map((resData, index) => (
                        <RestaurantCard key={index} resData={resData} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Body;
