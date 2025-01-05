import React from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import SidePanel from "../components/sidePanel"; // Side panel with logo and description
import "./home.css"; // Import styles

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <SidePanel />
        <div className="main-content">
          <h1>Welcome to the FYP Automation System</h1>
          <p>
            This system helps manage final year projects efficiently with features like proposal submission, group management, and progress tracking.
          </p>

          <div className="feature-section">
            <h2>Key Features</h2>
            <div className="features-list">
              <div className="feature-card">
                <h3>Project Progress Management</h3>
                <p>Track milestones, task completion, and generate progress reports.</p>
              </div>
              <div className="feature-card">
                <h3>Group Management</h3>
                <p>Manage team profiles, roles, and communication channels.</p>
              </div>
              <div className="feature-card">
                <h3>Staff Management</h3>
                <p>Maintain faculty advisor profiles and meeting schedules.</p>
              </div>
              <div className="feature-card">
                <h3>Testing Management</h3>
                <p>Track test cases, bug reports, and testing results.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Get Started Today!</h2>
            <p>Ready to streamline your project management? Sign up now to start using the system.</p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
