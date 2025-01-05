import React, { useState } from 'react';
import Navbar from "../components/navbar";
import './loginPage.css'; // Your CSS file for styling

const LoginPage = () => {
  const [step, setStep] = useState(1); // Track which step the user is on
  const [role, setRole] = useState(''); // Track the selected role

  // Handle role selection
  const handleRoleSelect = (role) => {
    setRole(role);
    setStep(2); // Go to step 2 (login form)
  };

  // Handle sign up (You can extend this function later for actual sign up functionality)
  const handleSignUp = () => {
    alert('Sign Up functionality will be implemented here.');
  };

  return (
    <div className="login-container">
      {/*<Navbar /> {/* Your Navbar component */}
      
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
          <form>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Login</button>
          </form>

          
          <div className="google-login">
          <p>Or, continue with:</p>
            <button className="google-button">
              <img
                src="/images/googleLogo.png"  alt="Google logo"
                className="google-logo"
              />
               Google
            </button>
          </div>
          
          {/* Sign Up Option */}
          <div className="sign-up-option">
            <p>Or, don't have an account?</p>
            <button onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
