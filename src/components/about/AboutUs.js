import React from 'react';
import './AboutUs.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Swaad Safari</h1>
        <p>Welcome to Swaad Safari, your ultimate destination for exploring the world of flavors! Swaad Safari is more than just a food ordering website; it's an adventure into the realm of culinary delights. Whether you're craving comfort food from your favorite local joint or eager to explore exotic cuisines from renowned chains, Swaad Safari is here to guide you on a delectable journey.</p>
      </div>
      
      <div className="features">
        <h2>Our Features</h2>
        <ul>
          <li>Search: Dive into our extensive database with our powerful search feature.</li>
          <li>Carousel Selection: Discover new favorites with our curated carousel selection.</li>
          <li>Top Chains: Explore the offerings from top restaurant chains in your area.</li>
          <li>Online & Offline: Enjoy the convenience of ordering online, or visit your favorite restaurants in person.</li>
          <li>Vegetarian & Non-Vegetarian: Catering to diverse dietary preferences, Swaad Safari offers a wide range of options.</li>
          <li>Ratings & Reviews: Make informed decisions with our comprehensive ratings and reviews system.</li>
          <li>Timings: Plan your meals effortlessly with our restaurant timings feature.</li>
        </ul>
      </div>

      <div className="tech-info">
        <h2>Built with the MERN Stack</h2>
        <p>Swaad Safari is powered by the MERN (MongoDB, Express.js, React.js, Node.js) stack, providing a robust and scalable platform for food delivery services. MongoDB offers a flexible and scalable database solution, while Express.js simplifies server-side development. React.js ensures a dynamic and interactive user interface, and Node.js enables efficient server-side processing.</p>
        <p>Additionally, we utilize CSS for styling to ensure a visually stunning and intuitive interface, making it easy for you to navigate and discover new culinary delights.</p>
      </div>
      
      <p className="passion">At Swaad Safari, we're passionate about food and committed to providing you with an unparalleled dining experience. Join us on this gastronomic adventure, and let your taste buds embark on a safari of flavors like never before!</p>
      
     
    </div>
  );
}

export default AboutUs;
