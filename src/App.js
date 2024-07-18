import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Header from './components/header/Header';
import Body from './components/body/Body';
import Search from './components/search/Search';
import AboutUs from './components/about/AboutUs';
import ContactUs from './components/contact/ContactUs';
import Cart from './components/cart/Cart';
import MenuPage from './components/menu/Menu';
import CarouselList from './components/filteredResList/CarouselList';
import Footer from './components/footer/Footer';
import TermsAndConditions from './components/tc/TermsAndConditions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MyProfile from './components/MyProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from '.';
import RestaurantForm from './components/RestaurantForm';
import CitySelector from './components/CitySelector'; // Import CitySelector
import DinoGame from './components/crome-dinogame';

const App = () => {
  const [resList, setResList] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const { setisauthenticated, setuser, setloader , selectedCity } = useContext(Context);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/newrestaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const addRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  useEffect(() => {
    setloader(true);
    axios.get("http://localhost:8000/api/v1/users/me", {
      withCredentials: true
    }).then(res => {
      setuser(res.data.user);
      setisauthenticated(true);
      setloader(false);
    }).catch((error) => {
      setuser({});
      setisauthenticated(false);
      setloader(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const itemKey = `${item.id}-${item.itemName}`;
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.key === itemKey);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, key: itemKey, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/all?city=${selectedCity}`);
        const data = await response.json();
        if (data && Array.isArray(data.doc)) {
          setResList(data.doc);
        } else {
          console.error('Expected an array but received:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity]);

   // Check if online
   const isOnline = navigator.onLine;

  return (
    <div className='app'>
      <Router>
        <Header cartItemCount={cartItems.length} />
        <CitySelector /> {/* Add the CitySelector component */}
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={isOnline ? <Body resList={resList} /> : <DinoGame />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart items={cartItems} setCartItems={setCartItems} />} />
          <Route path="/menu/:id" element={<MenuPage restaurants={resList} addToCart={addToCart} />} />
          <Route path="/carousel-list" element={<CarouselList />} />
          <Route path="/tc" element={<TermsAndConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/admin-panel" element={<>
            <RestaurantForm addRestaurant={addRestaurant} />
          </>} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
