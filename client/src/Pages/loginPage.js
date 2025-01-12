import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './loginPage.css';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleRoleSelect = (role) => {
    setRole(role);
    setStep(2);
  };

  // Function to handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (role === "Student") {
      navigate("/dashboard/student"); // Redirect to Student Dashboard
    }
    else if(role==="Admin"){
      navigate("/dashboard/admin"); // Redirect to Admin Dashboard
      

    }
    else if(role==="Supervisor"){
      navigate("/dashboard/supervisor"); // Redirect to Admin Dashboardelse {
      
    }
    else {alert("This role's dashboard is not yet implemented!");}
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
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="google-login">
            <p>Or, continue with:</p>
            <button className="google-button">
              <img src="/images/googleLogo.png" alt="Google logo" className="google-logo" />
              Google
            </button>
          </div>

          <div className="sign-up-option">
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
