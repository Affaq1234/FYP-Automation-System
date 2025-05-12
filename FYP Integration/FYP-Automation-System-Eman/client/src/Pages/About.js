import React from "react";
import Navbar from "../components/navbar"; // Navigation bar 
import "./about.css"; // CSS file 
import Footer from "../components/footer"; // Footer 

// About Us page component
const About = () => {
  return (
    <div className="about-container">
      <Navbar /> {/* Calling navigation bar */}

      {/* Hero section  */}
      <div className="about-hero-section">
        <h1>About Us</h1>
        <p>Learn more about our vision, mission, and the team behind this project.</p>
      </div>

      {/* Main content section  */}
      <div className="about-content">

        {/* Section explaining the vision behind the project */}
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We aim to revolutionize project management for final year students, providing tools and features that
            make it seamless and efficient.
          </p>
        </section>

        {/* Section explaining the project's mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower students with innovative solutions for managing their projects, from
            proposals to final reports.
          </p>
        </section>

        {/* Team section introducing the members involved in the project */}
        <section className="about-section team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">

            {/* Individual team member profiles with images, names, and roles */}
            <div className="team-member">
              <img src="team-member1.jpg" alt="Team Member 1" />
              <h3>Asadullah Khan</h3>
              <p>Database Developer</p>
            </div>

            <div className="team-member">
              <img src="team-member2.jpg" alt="Team Member 2" />
              <h3>Affaq</h3>
              <p>Backend Developer</p>
            </div>

            <div className="team-member">
              <img src="team-member3.jpg" alt="Team Member 3" />
              <h3>Eman Zubair</h3>
              <p>Frontend Developer</p>
            </div>

            <div className="team-member">
              <img src="team-member4.jpg" alt="Team Member 4" />
              <h3>Ayesha</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </section>
      </div>

      <Footer /> {/* calling footer at the bottom */}
    </div>
  );
};

export default About;
