// Cart.js
import React, { useState, useEffect } from 'react';
import Payment from '../Payment';
import emptyCartImage from './emptycart.png';
import "./Cart.css";

const Cart = ({ items, setCartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(items));
  }, [items]);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return total + (itemPrice * itemQuantity);
      } else {
        console.error('Invalid price or quantity:', item);
        return total;
      }
    }, 0);
  };

  const handleIncreaseQuantity = (key) => {
    const updatedCartItems = items.map(item => {
      if (item.key === key) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (key) => {
    const updatedCartItems = items.map(item => {
      if (item.key === key && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (key) => {
    const updatedCartItems = items.filter(item => item.key !== key);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="cart-container">
      {items.length === 0 ? (
        <div className="empty-cart">
          <img src={emptyCartImage} alt="Empty Cart" className="empty-cart-image" />
          <p className="slogan">Add some delicious items to your cart!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            <h2>Cart Items</h2>
            <ul className="cart-items">
              {items.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.itemName} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.itemName}</h4>
                    <p>Price: ₹{item.price}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleDecreaseQuantity(item.key)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.key)}>+</button>
                    </div>
                    <button onClick={() => handleRemoveItem(item.key)} className="remove-item-button">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <ul className="summary-items">
              {items.map((item, index) => (
                <li key={index} className="summary-item">
                  <span>{item.itemName} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <span>Total Price: ₹{totalPrice.toFixed(2)}</span>
            </div>
            <Payment totalAmount={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
