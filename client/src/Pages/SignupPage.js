import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./SignupPage.css"; // CSS file for styling

const SignupPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="signup-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="fas fa-times"></i>
      </button>

      <div className="signup-form">
        <h2>Create Your Account</h2>
        <form>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" id="name" placeholder="Full Name" required />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Email Address" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Password" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" id="confirm-password" placeholder="Confirm Password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="alternate-option">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
