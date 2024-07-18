import React, { useState, useEffect } from 'react';
import "./Search.css";
import RestaurantCard from '../rescard/Rescard';
import WhatInYourMindCarouselSearch from '../searchcarousel/WhatInYourMindCarousel';

const Search = () => {
    const [ListOfRes, setListOfRes] = useState([]);
    const [filteredList, setFilteredList] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/all");
            const data = await response.json();
            if (data && Array.isArray(data.doc)) {
                const formattedData = data.doc.map(restaurant => ({
                    info: {
                        ...restaurant.info,
                        menu: restaurant.info.menu // Ensuring menu is part of the info object
                    }
                }));
                setListOfRes(formattedData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        const lowercaseFilteredList = filteredList.trim().toLowerCase();
        const newRes = ListOfRes.filter((res) => {
            return res.info.menu && Array.isArray(res.info.menu) && res.info.menu.some(item =>
                item.itemName && item.itemName.toLowerCase().includes(lowercaseFilteredList)
            );
        });
        setSearchResults(newRes);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='searchpage'>
            <div className='d-bar'>
                <div className='d-text'>
                    <input
                        type='text'
                        placeholder='Search for restaurants and food'
                        value={filteredList}
                        onChange={(e) => setFilteredList(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png' alt="Search" width={"30px"} />
                    </button>
                </div>
            </div>

            <div className="search-results">
                {searchResults.map((result, index) => (
                    <RestaurantCard key={index} resData={result} />
                ))}
            </div>

            <div>
                <div className="cuisine">Popular Cuisines</div>
                <WhatInYourMindCarouselSearch/>
            </div>
        </div>
    );
};

export default Search;
