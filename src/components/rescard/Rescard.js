import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Rescard.css';

const RestaurantCard = ({ resData }) => {
    const navigate = useNavigate();
    const { info } = resData || {};
    const {
        name,
        resimage,
        locality,
        cuisines = [],
        id
    } = info || {};

    const handleClick = () => {
        navigate(`/menu/${id}`);
    };

    return (
        <div className='rescontainer' onClick={handleClick}>
            <div className='resCard'>
                {resimage ? (
                    <img 
                        src={resimage} 
                        alt='Restaurant' 
                    />
                ) : (
                    <img className='placeholder-image' src={resimage} />
                )}
                <h3>{name || 'Unnamed Restaurant'}</h3>
                <h4>{locality || 'Unknown Locality'}</h4>
                <p>{cuisines.length > 0 ? cuisines.join(", ") : 'No cuisines available'}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;
