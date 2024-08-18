import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contactPage">
      <h1 className="contactTitle">Contact Us</h1>
      <form className="contactForm">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
