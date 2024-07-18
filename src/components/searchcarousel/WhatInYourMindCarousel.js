import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import rollsImage from '../carouselhp/images/Rolls.avif';
import rasmalaiImage from '../carouselhp/images/Rasmalai.avif';
import pavBhajiImage from '../carouselhp/images/Pav_Bhaji.avif';
import pastaImage from '../carouselhp/images/Pasta.avif';
import parathaImage from '../carouselhp/images/Paratha.avif';
import northIndianImage from '../carouselhp/images/North_Indian_4.avif';
import noodlesImage from '../carouselhp/images/Noodles.avif';
import momosImage from '../carouselhp/images/Momos.avif';
import lassiImage from '../carouselhp/images/Lassi.avif';
import idliImage from '../carouselhp/images/Idli.avif';
import iceCreamImage from '../carouselhp/images/Ice_Creams.avif';
import dosaImage from '../carouselhp/images/Dosa.avif';
import choleBhatureImage from '../carouselhp/images/Chole_Bature.avif';
import chineseImage from '../carouselhp/images/Chinese.avif';
import cakesImage from '../carouselhp/images/Cakes.avif';
import burgerImage from '../carouselhp/images/Burger.avif';
import biryaniImage from '../carouselhp/images/Biryani_2.avif';
import CoffeImage from '../carouselhp/images/Coffee.avif';
import GulabjamunImage from '../carouselhp/images/Gulab_Jamun.avif';
import ShakesImage from '../carouselhp/images/Shakes.avif';
import KhichdiImage from '../carouselhp/images/Khichdi.avif';
import RasgullaImage from '../carouselhp/images/Rasgulla.avif';

import "./WhatInYourMindCarousel.css";
const dishes = [
    { id: 1, name: 'Rolls', image: rollsImage },
    { id: 2, name: 'Rasmalai', image: rasmalaiImage },
    { id: 3, name: 'Pav Bhaji', image: pavBhajiImage },
    { id: 4, name: 'Pasta', image: pastaImage },
    { id: 5, name: 'Paratha', image: parathaImage },
    { id: 6, name: 'North Indian', image: northIndianImage },
    { id: 7, name: 'Noodles', image: noodlesImage },
    { id: 8, name: 'Momos', image: momosImage },
    { id: 9, name: 'Lassi', image: lassiImage },
    { id: 10, name: 'Idli', image: idliImage },
    { id: 11, name: 'Ice Cream', image: iceCreamImage },
    { id: 12, name: 'Dosa', image: dosaImage },
    { id: 13, name: 'Chole Bhature', image: choleBhatureImage },
    { id: 14, name: 'Chinese', image: chineseImage },
    { id: 15, name: 'Cakes', image: cakesImage },
    { id: 16, name: 'Burger', image: burgerImage },
    { id: 17, name: 'Biryani', image: biryaniImage },
    { id: 18, name: 'Coffee', image: CoffeImage },
    { id: 19, name: 'Gulab_Jamun', image: GulabjamunImage },
    { id: 21, name: 'Shakes', image: ShakesImage },
    { id: 22, name: 'Khichdi', image: KhichdiImage },
    { id: 23, name: 'Rasgulla', image: RasgullaImage },
    // Add more dish objects as needed
];

const MOVE_COUNT = 1;
const MAX_RIGHT_CLICK_VALUE = dishes.length - 1;

const WhatInYourMindCarouselSearch = ({ title }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [style, setStyle] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch restaurant data from your API
        fetch('http://localhost:8000/api/v1/all')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Add this line to debug fetched data
                if (data.success && Array.isArray(data.doc)) {
                    setRestaurants(data.doc);
                } else {
                    console.error('Data fetched is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const nextSlide = () => {
        if (currentSlide < MAX_RIGHT_CLICK_VALUE) {
            setCurrentSlide(prev => prev + MOVE_COUNT);
            setStyle({ transform: `translateX(-${(currentSlide + 1) * 10}%)` });
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
            setStyle({ transform: `translateX(-${(currentSlide - 1) * 10}%)` });
        }
    };

    const handleDishClick = (dishName) => {
        console.log('Clicked on dish:', dishName);
        console.log('Restaurants:', restaurants); // Add this line to debug restaurants array
        if (Array.isArray(restaurants)) {
            const filtered = restaurants.filter(restaurant =>
                restaurant.info.menu.some(item => {
                    console.log(`Checking menu item: ${item.itemName}`); // Debug each menu item
                    return item.itemName.toLowerCase().includes(dishName.toLowerCase());
                })
            );
            console.log('Filtered results:', filtered);
            navigate('/carousel-list', { state: { dishName, searchResults: filtered } });
        } else {
            console.error('Restaurants is not an array:', restaurants);
        }
    };

    return (
        <div>
            <div className="carousel-container">
             
                <div className="carousel">
                    <div className="carousel-inner" style={style}>
                        {dishes.map((dish) => (
                            <div key={dish.id} className="image" onClick={() => handleDishClick(dish.name)}>
                                <img src={dish.image} alt={dish.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatInYourMindCarouselSearch;