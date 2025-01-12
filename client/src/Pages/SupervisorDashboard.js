import React from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import Footer from "../components/footer"; // Footer
import SupervisorSidebar from "../components/SupervisorSidebar"; // Sidebar
import "./SupervisorDashboard.css";

const SupervisorDashboard = () => {
  const stats = [
    { id: 1, label: "Active Groups", value: 3 },
    { id: 2, label: "Proposals Reviewed", value: 12 },
    { id: 3, label: "Meetings Scheduled", value: 8 },
    { id: 4, label: "Feedback Given", value: 20 },
  ];

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />

      <div className="dashboard-layout">
        {/* Sidebar */}
        <SupervisorSidebar />

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Welcome Section */}
          <div className="hero-section">
            <h1>Welcome, Supervisor!</h1>
            <p>Your centralized hub for managing and evaluating projects.</p>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.id} className="stat-card">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SupervisorDashboard;
