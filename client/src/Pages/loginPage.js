import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './loginPage.css';

const LoginPage = () => {
  // State to track step in the login process
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to select a role and proceed to login form
  const handleRoleSelect = (role) => {
    setRole(role);
    setStep(2);
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Function to handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Email
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Password
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // If there are validation errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login process with a loading effect
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect user to the respective dashboard based on role
      if (role === "Student") {
        navigate("/dashboard/student");
      } else if (role === "Supervisor") {
        navigate("/dashboard/supervisor");
      } else if (role === "Evaluator") {
        navigate("/dashboard/evaluator");
      } else if (role === "Admin") {
        navigate("/dashboard/admin");
      }
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Close button to return to the homepage */}
      {step === 2 && (
        <button className="back-button" onClick={() => navigate("/")}>
          <i className="fas fa-times"></i>
        </button>
      )}

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="role-selection">
          <h2>Who are you?</h2>
          <div className="role-buttons">
            <button onClick={() => handleRoleSelect('Admin')}> Admin</button>
            <button onClick={() => handleRoleSelect('Supervisor')}>Supervisor</button>
            <button onClick={() => handleRoleSelect('Evaluator')}>Evaluator</button>
            <button onClick={() => handleRoleSelect('Student')}>Student</button>
          </div>
        </div>
      )}

      {/* Step 2: Login Form */}
      {step === 2 && role && (
        <div className="login-form">
          <h2>Login as {role}</h2>
          <form onSubmit={handleLoginSubmit}>

            {/* Email Input */}
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" }); // Clear error when typing
                }}
                required
              />
              {errors.email && (
                <p className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" }); // Clear error when typing
                }}
                required
              />
              {errors.password && (
                <p className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {errors.password}
                </p>
              )}
            </div>

            {/* Login Button with Loading Effect */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
          </form>

          {/* Sign-up Option for Students Only */}
          {role === "Student" && (
            <div className="sign-up-option">
              <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
