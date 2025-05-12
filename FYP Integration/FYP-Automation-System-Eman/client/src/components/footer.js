import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We provide innovative tools to streamline project management for final year students. Our mission is to enhance collaboration and efficiency through cutting-edge solutions.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="fas fa-envelope"></i> asadullahkham97@gmail.com </p>
          <p><i className="fas fa-phone"></i> +923230080740</p>
         
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 FYP Automation System.</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/asad-ullah-k-5147a5261/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://www.instagram.com/asads_cap/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
