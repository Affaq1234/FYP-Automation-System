import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar"; // Adjust the path if needed
import "./SupervisorDashboard.css"; 
const SupervisorDashboard = () => {
  return (
    <div className="dashboard-container">
        <Navbar />
      <SupervisorSidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Supervisor Dashboard</h1>
        <p>Access all the tools and features available for Supervisors.</p>
      </div>
      <Footer />
    </div>
  );
};

export default SupervisorDashboard;
