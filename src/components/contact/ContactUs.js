import React, { useState } from 'react';
import './ContactUs.css';
import { Context } from '../..';
import { useContext } from 'react';


const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {loader,setloader}=useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloader(true);
        try {
            const response = await fetch('http://localhost:8000/api/v1/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, phoneNumber })
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
            setErrorMessage(data.message);
            } setloader(false);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setloader(false);
        }
    };
    

    return (
        <div className="contact-us-container">
            <h2>Contact Us</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <button disable={loader} className='submitbtn' type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
