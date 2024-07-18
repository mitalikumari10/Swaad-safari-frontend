import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createContext } from 'react';


export const Context = createContext({
  isAuthenticated: false,
  setisauthenticated: () => {},
  loader: false,
  setloader: () => {},
  user: {},
  setuser: () => {},
  cartItems: [],
  setCartItems: () => {},
  selectedCity: 'Jabalpur', // Default city
  setSelectedCity: () => {},
});

const Appwrapper = () => {
  const [isauthenticated, setisauthenticated] = useState(false);
  const [user, setuser] = useState({});
  const [loader, setloader] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Jabalpur');
  return (
    <Context.Provider
      value={{
        isauthenticated,
        setisauthenticated,
        loader,
        setloader,
        user,
        setuser,
        cartItems,
        setCartItems,
        selectedCity,
        setSelectedCity,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>
);

export default Appwrapper;
