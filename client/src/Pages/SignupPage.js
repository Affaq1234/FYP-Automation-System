import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    registrationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateRegistrationNumber = (regNo) => {
    const regNoPattern = /^\d{4}-[A-Za-z]{2}-\d{3}$/; // Example: 2023-CS-123
    return regNoPattern.test(regNo);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Registration Number
    if (!validateRegistrationNumber(formData.registrationNumber)) {
      newErrors.registrationNumber = "Registration number must be in the format: YYYY-XX-XXX";
    }

    // Validate Password
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Validate Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    console.log("Form submitted:", formData);
    navigate("/dashboard/student"); // Redirect to Student Dashboard after successful signup
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear error when user types
  };

  return (
    <div className="signup-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="fas fa-times"></i>
      </button>

      <div className="signup-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-user-circle"></i>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-id-card"></i>
            <input
              type="text"
              id="registrationNumber"
              placeholder=" (e.g., 2023-CS-123)"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
            {errors.registrationNumber && (
              <p className="error-message">{errors.registrationNumber}</p>
            )}
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
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