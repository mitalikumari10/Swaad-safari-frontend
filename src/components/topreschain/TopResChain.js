import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./TopResChain.css";

const SLIDE_WIDTH_PERCENTAGE = 100 / 5; // Assuming you want to show 5 slides at once

const TopResChain = ({ data, city }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const filteredSlides = data.filter(restaurant => (restaurant.info?.avgRating || 0) >= 4.2);

    const nextSlide = () => {
        if (currentSlide < filteredSlides.length - 1) {
            setCurrentSlide(prevSlide => prevSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prevSlide => prevSlide - 1);
        }
    };

    const handleClick = (id) => {
        navigate(`/menu/${id}`);
    };

    return (
        <div className="topchain">
            <div className="headerchain">
                <div className="titlechain">Top Restaurant Chains in {city}</div>
                <span className="scroll-arrowchain">
                    <FontAwesomeIcon
                        className={`circle ${currentSlide === 0 ? 'disabled' : ''}`}
                        icon={faArrowLeft}
                        onClick={prevSlide}
                    />
                    <FontAwesomeIcon
                        className={`circle ${currentSlide === filteredSlides.length - 1 ? 'disabled' : ''}`}
                        icon={faArrowRight}
                        onClick={nextSlide}
                    />
                </span>
            </div>
            <div className="carouselchain">
                <div className="carousel-innerchain" style={{ transform: `translateX(-${currentSlide * SLIDE_WIDTH_PERCENTAGE}%)` }}>
                    {filteredSlides.map((restaurant, index) => {
                        const { resimage, name, id ,locality} = restaurant.info || {};
                        return (
                            <div key={index} className="imagechain" onClick={() => handleClick(id)}>
                                {resimage && (
                                    <img
                                        src={resimage}
                                        alt={`Slide ${index}`}
                                    />
                                )}
                                <div className="restaurant-details">
                                    <h3>{name}</h3>
                                    <h4>{locality || 'Unknown Locality'}</h4>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TopResChain;
