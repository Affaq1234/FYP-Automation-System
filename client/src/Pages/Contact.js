import React from "react";
import Navbar from "../components/navbar"; // Reuse the Navbar component
import "./contact.css"; // Styles specific to Contact Us page
import Footer from "../components/footer";

const Contact = () => {
  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-hero-section">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us for any inquiries or feedback.</p>
      </div>
      <div className="contact-content">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions about our system or need assistance? We're here to help.
          </p>
          <ul>
            <li>
              <i className="fas fa-envelope"></i> Email: support@fypautomation.com
            </li>
            <li>
              <i className="fas fa-phone"></i> Phone: +123-456-7890
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Address: 123 Main Street, Tech City
            </li>
          </ul>
        </section>
        <section className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Write your message here" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
