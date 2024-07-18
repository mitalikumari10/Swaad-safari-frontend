import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-about">
          <h3>Swaad Safari</h3>
          <p>
            Embark on a culinary adventure with Swaad Safari. Discover the essence of Indian flavors, where tradition meets taste, and every dish is a celebration of culture.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Menu</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/admin-panel">Admin Panel</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <label>Email:</label>
              <a href="mailto:swaadsafari10@gmail.com">swaadsafari10@gmail.com</a>
            </li>
            <li>
              <label>Phone:</label>
              <a href="tel:+917000530287">+91 7000530287</a>
            </li>
            <li>
              <label>Address:</label>
              <span>Spice Street,Flavor Town</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <span className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/swaadsafari" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/swaadsafari" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/swaadsafari" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className='terms'><a href="/tc">Terms And Conditions</a></div>
        </span>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Swaad Safari. All Rights Reserved.</p>
        <p>Made with <span role="img" aria-label="love">❤️</span> by Mitali Kumari</p>
      </div>
    </footer>
  );
};

export default Footer;
