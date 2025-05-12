import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "./navbar.css"; // Import styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div className="navbar-logo">
          <a href="/">FYP Automation</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
