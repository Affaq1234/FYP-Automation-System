import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './loginPage.css';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setRole(role);
    setStep(2);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

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

    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "Student") {
        navigate("/dashboard/student"); // Redirect to Student Dashboard
      } else if (role === "Supervisor") {
        navigate("/dashboard/supervisor"); // Redirect to Supervisor Dashboard
      } else if (role === "Admin") {
        navigate("/dashboard/admin");
      }
    }, 2000);
  };

  return (
    <div className="login-container">
      {step === 2 && (
        <button className="back-button" onClick={() => navigate("/")}>
          <i className="fas fa-times"></i>
        </button>
      )}

      {step === 1 && (
        <div className="role-selection">
          <h2>Who are you?</h2>
          <div className="role-buttons">
            <button onClick={() => handleRoleSelect('Admin')}>Login as Admin</button>
            <button onClick={() => handleRoleSelect('Supervisor')}>Login as Supervisor</button>
            <button onClick={() => handleRoleSelect('Student')}>Login as Student</button>
          </div>
        </div>
      )}

      {step === 2 && role && (
        <div className="login-form">
          <h2>Login as {role}</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" }); // Clear email error when typing
                }}
                required
              />
              {errors.email && (
                <p className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {errors.email}
                </p>
              )}
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" }); // Clear password error when typing
                }}
                required
              />
              {errors.password && (
                <p className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i> // Loading spinner
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Sign-up Option - Visible Only for Students */}
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