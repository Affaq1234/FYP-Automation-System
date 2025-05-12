import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './loginPage.css';

// Backend Integration Done
import { loginUser } from '../api/auth';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2); // Proceed to login form after role selection
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      // Role is not selected, show error
      setErrors({ general: "Please select your role." });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Trying to log in with role:", role);
      const data = await loginUser(email, password, role);
      console.log("Login API Response:", data);

      if (data.success || data.status === "success") {
        localStorage.setItem('users', JSON.stringify(data.user));

        // Navigate based on role
        if (role === "Student") {
          navigate("/dashboard/student");
        } else if (role === "Supervisor") {
          navigate("/dashboard/supervisor");
        } else if (role === "Evaluator") {
          navigate("/dashboard/evaluator");
        } else if (role === "Admin") {
          navigate("/dashboard/admin");
        }
      } else {
        setErrors({ general: data.message || "Invalid email or password." });
      }
    } catch (error) {
      console.log("Catch error:", error.message);
      setErrors({ general: error.message || "Server error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {step === 2 && (
        <button className="back-button" onClick={() => setStep(1)}>
          <i className="fas fa-times"></i>
        </button>
      )}

      {step === 1 && (
        <div className="role-selection">
          <h2>Who are you?</h2>
          <div className="role-buttons">
            <button onClick={() => handleRoleSelect('Admin')}>Admin</button>
            <button onClick={() => handleRoleSelect('Supervisor')}>Supervisor</button>
            <button onClick={() => handleRoleSelect('Evaluator')}>Evaluator</button>
            <button onClick={() => handleRoleSelect('Student')}>Student</button>
          </div>
        </div>
      )}

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
                  setErrors({ ...errors, email: "" });
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
                  setErrors({ ...errors, password: "" });
                }}
                required
              />
              {errors.password && (
                <p className="error-message">
                  <i className="fas fa-exclamation-circle"></i> {errors.password}
                </p>
              )}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <p className="error-message">
                <i className="fas fa-exclamation-circle"></i> {errors.general}
              </p>
            )}

            {/* Login Button */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
          </form>

          {/* Sign-up Option for Students */}
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
