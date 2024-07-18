import { Link } from 'react-router-dom';
import logo from './images/img.png';
import { ICON1, ICON2, ICON3,ICON4,ICON5 , ICON6 ,ICON8} from '../../utils/common';
import './Header.css';
import { useContext } from 'react';
import { Context } from '../..';
import { toast } from 'react-toastify';
import axios from 'axios';
import CitySelector from '../CitySelector';

const Header = ({ cartItemCount, setToken, token }) => {
  const {isauthenticated,setisauthenticated,loader,setloader,setCartItems}=useContext(Context);

  const handleLogout = async () => {
    setloader(true);
    try {
      // Make API call to logout endpoint
      await axios.get("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      
      // Clear local cart items
      setCartItems([]);

      localStorage.removeItem('cartItems');
      // Reset authentication state
      setisauthenticated(false);

      // Display success message
      toast.success("Logged Out Successfully");

      // Redirect to login page
      // You may need to import navigate from your routing library
      // and use it here to navigate programmatically
      // navigate('/login');

    } catch (error) {
      // Display error message if logout fails
      toast.error(error.response?.data?.message || "An error occurred");
      console.error('Error logging out:', error);
      
      // Reset authentication state to handle edge cases
      setisauthenticated(false);
    } finally {
      // Ensure loader is set to false after logout operation completes
      setloader(false);
    }
  };

  const handleLogoClick = () => {
    // Reload the home page when logo is clicked
    window.location.href = '/';
  };

  const handleLogoutClick = () => {
    // Reload the home page when logout is clicked
    window.location.href = '/';
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const handleprofileClick = () => {
    // Reload 
    window.location.href = '/myprofile';
  };

  const combinedClickHandler = () => {
    handleLogout();
    handleLogoutClick();
  };

  return (
    <div className='header'>
      <Link to="/" onClick={handleLogoClick}><img className='logo' src={logo} alt='img' /></Link>
      <div className='nav-items'>
        <ul>
          <CitySelector />
          <Link to="/search"><img src={ICON1} alt='img' /><li>Search</li></Link>
          <Link to="/about"><img src={ICON2} alt='img' /><li>About Us</li></Link>
          <Link to="/contact"><img src={ICON3} alt='img' /><li>Contact Us</li></Link>
          <Link to="/cart">
            <img src={ICON5} alt='img' />
            <li>
              Cart {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </li>
          </Link>

        
          <Link to="/myprofile" onClick={handleprofileClick}><img src={ICON4} alt='img' /><li>My Profile</li></Link>
           {
            isauthenticated ? <button disable={loader} onClick={combinedClickHandler} className='btnn' ><img src={ICON8} alt='img' />Logout</button>: <Link to="/login"><img src={ICON6} alt='img' /><li>Login</li></Link>
           }
            
         
  </ul>  
        </div>
      </div>
  );
};

export default Header;
