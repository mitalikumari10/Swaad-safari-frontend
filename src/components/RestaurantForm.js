import React, { useState } from 'react';
import axios from 'axios';
import './RestaurantForm.css';
import { Link } from 'react-router-dom';

const RestaurantForm = ({ addRestaurant }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    resimage: null,
    locality: '',
    costForTwo: '',
    cuisines: '',
    avgRating: '',
    veg: false,
    menu: [{ itemName: '', price: '', image: null }],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleMenuChange = (index, e) => {
    const { name, value, files } = e.target;
    const newMenu = [...formData.menu];
    if (files) {
      newMenu[index][name] = files[0];
    } else {
      newMenu[index][name] = value;
    }
    setFormData({ ...formData, menu: newMenu });
  };

  const handleAddMenuItem = () => {
    setFormData({
      ...formData,
      menu: [...formData.menu, { itemName: '', price: '', image: null }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.id);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('resimage', formData.resimage);
    formDataToSend.append('locality', formData.locality);
    formDataToSend.append('costForTwo', formData.costForTwo);
    formDataToSend.append('cuisines', formData.cuisines.split(','));
    formDataToSend.append('avgRating', formData.avgRating);
    formDataToSend.append('veg', formData.veg);
    formData.menu.forEach((item, index) => {
      formDataToSend.append(`menu[${index}][itemName]`, item.itemName);
      formDataToSend.append(`menu[${index}][price]`, item.price);
      formDataToSend.append(`menu[${index}][image]`, item.image);
    });

    try {
      const response = await axios.post('/api/v1/newrestaurants', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      addRestaurant(response.data);
      setSuccess('Restaurant added successfully!');
      setError('');
      setFormData({
        id: '',
        name: '',
        resimage: null,
        locality: '',
        costForTwo: '',
        cuisines: '',
        avgRating: '',
        veg: false,
        menu: [{ itemName: '', price: '', image: null }],
      });
    } catch (err) {
      setError('Error adding restaurant.');
      setSuccess('');
    }
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <h2>Add New Restaurant</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <label htmlFor="id">Restaurant ID:</label>
      <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
      <label htmlFor="name">Restaurant Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      <label htmlFor="resimage">Restaurant Image:</label>
      <input type="file" id="resimage" name="resimage" onChange={handleFileChange} required />
      <label htmlFor="locality">Locality:</label>
      <input type="text" id="locality" name="locality" value={formData.locality} onChange={handleChange} required />
      <label htmlFor="costForTwo">Cost for Two:</label>
      <input type="number" id="costForTwo" name="costForTwo" value={formData.costForTwo} onChange={handleChange} required />
      <label htmlFor="cuisines">Cuisines (comma-separated):</label>
      <input type="text" id="cuisines" name="cuisines" value={formData.cuisines} onChange={handleChange} required />
      <label htmlFor="avgRating">Average Rating:</label>
      <input type="number" step="0.1" id="avgRating" name="avgRating" value={formData.avgRating} onChange={handleChange} required />
      <label htmlFor="veg">Vegetarian:</label>
      <input type="checkbox" id="veg" name="veg" checked={formData.veg} onChange={handleChange} />

      {formData.menu.map((item, index) => (
        <div key={index}>
          <label htmlFor={`itemName-${index}`}>Menu Item Name:</label>
          <input
            type="text"
            id={`itemName-${index}`}
            name="itemName"
            value={item.itemName}
            onChange={(e) => handleMenuChange(index, e)}
            required
          />
          <label htmlFor={`price-${index}`}>Menu Item Price:</label>
          <input
            type="number"
            id={`price-${index}`}
            name="price"
            value={item.price}
            onChange={(e) => handleMenuChange(index, e)}
            required
          />
          <label htmlFor={`image-${index}`}>Menu Item Image:</label>
          <input
            type="file"
            id={`image-${index}`}
            name="image"
            onChange={(e) => handleMenuChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddMenuItem}>Add Menu Item</button>
      <button type="submit"> <Link to="/admin-panel">Add Restaurant</Link></button>
  
    </form>
  );
};

export default RestaurantForm;
