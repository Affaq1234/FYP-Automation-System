import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/navbar"; // Top navigation bar
import SidePanel from "../components/sidePanel"; // Side panel with logo and description
import "./home.css"; // Import styles
import Footer from "../components/footer";


const Home = () => {
    const announcements = [
        { id: 1, text: "Proposal submission deadline is March 15th." },
        { id: 2, text: "New feature: Automated bug tracker added." },
        { id: 3, text: "Reminder: Mid-term progress reviews next week." },
      ];
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
    <div>
        <h1>Streamline Your Final Year Projects</h1>
        <p>Efficient management with cutting-edge tools at your fingertips.</p>
        <Link to="/signup" className="signup-hero-button">
          Sign Up Now
        </Link>
    </div>
    </div>

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
              <i className="fas fa-tasks" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Project Progress Management</h3>
                <p>Track milestones, task completion, and generate progress reports.</p>
              </div>
              <div className="feature-card">
              <i className="fas fa-users" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Group Management</h3>
                <p>Manage team profiles, roles, and communication channels.</p>
              </div>
              <div className="feature-card">
              <i className="fas fa-user-tie" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Staff Management</h3>
                <p>Maintain faculty advisor profiles and meeting schedules.</p>
              </div>
              <div className="feature-card">
              <i className="fas fa-bug" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Testing Management</h3>
                <p>Track test cases, bug reports, and testing results.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Proposal Management</h3>
                <p>Submit and review project proposals with real-time status updates.</p>
            </div>

            <div className="feature-card">
                <i className="fas fa-chart-bar" style={{ fontSize: '2rem', color: '#8c00ff', marginBottom: '10px' }}></i>
                <h3>Reporting & Analytics</h3>
                <p>Generate detailed reports and analyze project progress data.</p>
            </div>
            </div>
          </div>

          <Slider className="carousel" dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
            {announcements.map((announcement) => (
                <div key={announcement.id}>
                <p style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold", color: "#260244" }}>
                    {announcement.text}
                </p>
                </div>
            ))}
          </Slider>

          <div className="cta-section">
            <h2>Get Started Today!</h2>
            <p>Ready to streamline your project management? Sign up now to start using the system.</p>
            <button className="cta-button">
            <Link to="/login">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
