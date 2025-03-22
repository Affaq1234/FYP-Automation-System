import React, { useState } from "react";
import "./FYPRecommendations.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const FYPRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input

  // Sample list of trending FYP ideas
  const trendingIdeas = [
    { id: 1, title: "AI-Powered Virtual Assistant", description: "Develop an AI chatbot for customer service." },
    { id: 2, title: "Smart Farming System", description: "IoT-based solution for modern agriculture." },
    { id: 3, title: "Blockchain for Supply Chain", description: "Secure and transparent supply chain management." },
  ];

  // Sample list of previous successful projects
  const successfulProjects = [
    { id: 1, title: "Autonomous Drone Delivery", description: "An innovative solution for last-mile delivery.", year: 2023 },
    { id: 2, title: "Personalized Health Monitoring App", description: "A mobile app for tracking health metrics.", year: 2022 },
    { id: 3, title: "Energy-Efficient Smart Home System", description: "A system to reduce energy consumption in households.", year: 2021 },
  ];

  // Filter trending ideas based on search input
  const filteredTrendingIdeas = trendingIdeas.filter((idea) =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter successful projects based on search input
  const filteredSuccessfulProjects = successfulProjects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fyp-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />

        {/* Main content area */}
        <div className="main-content">
          <h1 className="fyp-title">FYP Recommendations</h1>

          {/* Search bar for filtering recommendations */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recommendations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Display Trending FYP Ideas */}
          <div className="trending-ideas">
            <h2>Trending FYP Ideas</h2>
            <ul>
              {filteredTrendingIdeas.map((idea) => (
                <li key={idea.id}>
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Display Previous Successful Projects */}
          <div className="successful-projects">
            <h2>Previous Successful Projects</h2>
            <ul>
              {filteredSuccessfulProjects.map((project) => (
                <li key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>Year: {project.year}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FYPRecommendations;
