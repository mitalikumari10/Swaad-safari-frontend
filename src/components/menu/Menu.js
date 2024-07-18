import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Menu.css';

const MenuPage = ({ restaurants = [], addToCart }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedRestaurant = restaurants.find(res => res?.info?.id === id);
    setRestaurant(selectedRestaurant);
  }, [id, restaurants]);

  const handleAddToCart = (item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    if (isNaN(price)) {
      console.error('Invalid price:', item);
      return;
    }
    addToCart({
      ...item,
      price,
      restaurantName: restaurant.info.name,
      locality: restaurant.info.locality,
      id: item.itemName 
    });
    
  };

  const getDescription = (itemName) => {
    const descriptions = {
      "Dosa": "A thin, crispy Indian crepe made from fermented rice and lentil batter, typically served with chutney and sambar.",
      "Samosa": "A fried South Asian pastry with a savoury filling, including ingredients such as spiced potatoes, onions, peas, meat, or fish. It is made into different shapes, including triangular, cone, or crescent, depending on the region.",
      "Lassi": "A refreshing yogurt-based drink, often flavored with fruit or spices, originating from the Indian subcontinent.",
      "Pav Bhaji": "A spicy blend of mashed vegetables cooked in butter, served with soft bread rolls.",
      "Idli": "Soft, steamed rice cakes, a staple breakfast item in South India, usually served with chutney and sambar.",
      "Gulab Jamun": "Deep-fried dough balls soaked in sugar syrup, a popular Indian dessert.",
      "Butter Chicken": "A rich and creamy curry made with marinated chicken cooked in a spiced tomato gravy.",
      "Chole Bhature": "A combination of spicy chickpea curry served with deep-fried bread called bhature.",
      "Hakka Noodles": "Stir-fried noodles with vegetables or meat, a popular Indo-Chinese dish.",
      "Momos": "Steamed or fried dumplings filled with vegetables or meat, often served with spicy sauce.",
      "Rasmalai": "A popular Indian dessert made from white cream, sugar, milk, and cardamom-flavored paneer cheese.",
      "Paneer Tikka": "Marinated paneer (Indian cottage cheese) cubes grilled to perfection, served with a side of chutney.",
      "Chicken Biryani": "A fragrant rice dish cooked with spices, herbs, and marinated chicken.",
      "Paratha": "A layered Indian flatbread, often stuffed with various fillings like potatoes, paneer, or vegetables.",
      "Ice Cream": "A cold, creamy dessert available in a variety of flavors.",
      "Rasgulla": "Soft, spongy balls made from chenna (Indian cottage cheese) and soaked in sugar syrup.",
      "Rolls": "Stuffed flatbreads rolled with a variety of fillings like chicken, paneer, or vegetables.",
      "Cakes": "A sweet baked dessert, often layered and topped with icing.",
      "Coffee": "A brewed drink prepared from roasted coffee beans.",
      "Pasta Alfredo": "A creamy pasta dish made with butter, cream, and Parmesan cheese.",
      "Tacos": "A traditional Mexican dish consisting of a folded or rolled tortilla filled with various ingredients.",
      "Burger": "A sandwich consisting of a cooked patty of ground meat or vegetables, placed inside a sliced bun.",
      "Khichdi": "A comforting Indian dish made from rice and lentils, often seasoned with spices.",
      "Pastry": "A baked item made from dough and often filled or topped with ingredients like cream, fruit, or chocolate.",
      "Cappuccino": "A warm, frothy coffee drink made with espresso and steamed milk.",
      "Muffin": "A small, domed cake made with various sweet or savory ingredients.",
      "Chinese Bhel": "A fusion snack combining Indian bhel and Chinese flavors with crispy noodles and vegetables.",
      "Dimsums": "Steamed or fried dumplings, typically filled with meat or vegetables, popular in Chinese cuisine.",
      "Quinoa Salad": "A healthy salad made with quinoa, vegetables, and often a light dressing.",
      "Green Smoothie": "A nutritious drink made by blending green vegetables with fruits and other ingredients."
    };
    return descriptions[itemName] || "A delicious menu item.";
  };


  return (
    <div className="menu-page">
      {restaurant ? (
        <div>
          <h1>{restaurant.info.name}</h1>
          <h2>Welcome to Our Restaurant!</h2>
          <h2>Menu</h2>
          <ul>
            {restaurant.info.menu.map(item => (
              <li key={item.itemName}>
                <div className="menu-item">
                  <div>
                    <h3>{item.itemName}</h3>
                    <p className="price">{item.price}</p>
                    <p>{getDescription(item.itemName)}</p>
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  </div>
                  <img src={item.image} alt={item.itemName} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MenuPage;

