import React from 'react';
import { Link } from 'react-router-dom'; 
import "./navbar.css"; // Import styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <Link to="/login">Login</Link> {/* Login page link */}
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
