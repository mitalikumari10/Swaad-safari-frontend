import React from 'react';
import './TermsAndConditions.css'; // Import CSS file for styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <h3>Welcome to Swaad Safari, a food delivery app developed by Mitali Kumari.</h3>
      <p>This website is created for development and practice purposes only. All images and layouts used are sourced from Google for display purposes only. No information is taken or used for any harmful purposes.</p>
      <p>By using this website, you agree to the following terms and conditions:</p>
      <ol>
        <li><strong>Acceptance of Terms</strong>: By accessing and using this website, you agree to be bound by these terms and conditions.</li>
        <li><strong>Use of Website</strong>: You agree to use this website only for lawful purposes and in accordance with all applicable laws and regulations.</li>
        <li><strong>Intellectual Property Rights</strong>: All content on this website, including text, graphics, logos, images, and software, is the property of Swaad Safari and is protected by intellectual property laws.</li>
        <li><strong>Disclaimer of Warranties</strong>: This website is provided "as is" without any representations or warranties, express or implied.</li>
        <li><strong>Limitation of Liability</strong>: Swaad Safari shall not be liable for any damages arising out of or in connection with the use or inability to use this website.</li>
        <li><strong>Indemnification</strong>: You agree to indemnify and hold harmless Swaad Safari and its affiliates from any claims, damages, liabilities, and expenses arising out of your use of this website.</li>
        <li><strong>Changes to Terms</strong>: Swaad Safari reserves the right to modify or revise these terms and conditions at any time.</li>
      </ol>

      <h2>Frequently Asked Questions (FAQ)</h2>
      <div className="faq">
        <div className="question">
          <input type="checkbox" id="question1" className="question-toggle" />
          <label htmlFor="question1" className="question-title">How can I place an order?</label>
          <div className="question-content">
            <p>To place an order, simply browse our menu, select the items you'd like to order, and proceed to checkout. Follow the prompts to complete your order.</p>
          </div>
        </div>
        <div className="question">
          <input type="checkbox" id="question2" className="question-toggle" />
          <label htmlFor="question2" className="question-title">Do you offer vegetarian options?</label>
          <div className="question-content">
            <p>Yes, we offer a variety of vegetarian options on our menu to cater to different dietary preferences.</p>
          </div>
        </div>
        <div className="question">
          <input type="checkbox" id="question3" className="question-toggle" />
          <label htmlFor="question3" className="question-title">What payment methods do you accept?</label>
          <div className="question-content">
            <p>We accept payment via credit/debit cards, PayPal, and cash on delivery.</p>
          </div>
        </div>
        <div className="question">
          <input type="checkbox" id="question4" className="question-toggle" />
          <label htmlFor="question4" className="question-title">Is there a minimum order requirement?</label>
          <div className="question-content">
            <p>Yes, there is a minimum order requirement of $10 for delivery.</p>
          </div>
        </div>
        <div className="question">
          <input type="checkbox" id="question5" className="question-toggle" />
          <label htmlFor="question5" className="question-title">Can I modify or cancel my order?</label>
          <div className="question-content">
            <p>You can modify or cancel your order before it has been prepared for delivery. Once the order is being prepared, modifications or cancellations may not be possible.</p>
          </div>
        </div>
        {/* Add more FAQ questions as needed */}
      </div>
    </div>
  );
}

export default TermsAndConditions;
