// Payment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = ({ totalAmount }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/me', { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user); // Save user details
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handlePayment = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      alert("Login First");
      navigate('/login');

      return;
    }

    try {
      const orderUrl = 'http://localhost:8000/api/v1/payment/order';
      const order = await axios.post(orderUrl, { amount: totalAmount, currency: 'INR' }, { withCredentials: true });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'Swaad Safari',
        description: 'Test Transaction',
        order_id: order.data.id,
        handler: function (response) {
          alert(`Payment successful: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: user.name, // Use the fetched user details
          email: user.email, // Use the fetched user details
          contact: '9999999999',
        },
        notes: {
          address: 'Some Address',
        },
        theme: {
          color: '#4CAF50',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <button className='proceed-to-pay-button' onClick={handlePayment}>Proceed To Pay</button>
  );
};

export default Payment;
