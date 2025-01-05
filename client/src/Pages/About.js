import React from "react";
import Navbar from "../components/navbar"; // Reuse the Navbar component
import "./about.css"; // Styles specific to About Us page
import Footer from "../components/footer";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero-section">
        <h1>About Us</h1>
        <p>Learn more about our vision, mission, and the team behind this project.</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We aim to revolutionize project management for final year students, providing tools and features that
            make it seamless and efficient.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower students with innovative solutions for managing their projects, from
            proposals to final reports.
          </p>
        </section>
        <section className="about-section team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="team-member1.jpg" alt="Team Member 1" />
              <h3>teamMember</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <img src="team-member2.jpg" alt="Team Member 2" />
              <h3>teamMember</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="team-member">
              <img src="team-member3.jpg" alt="Team Member 3" />
              <h3>teamMember</h3>
              <p>Project Manager</p>
            </div>
            <div className="team-member">
              <img src="team-member4.jpg" alt="Team Member 4" />
              <h3>teamMember</h3>
              <p>Developer</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
