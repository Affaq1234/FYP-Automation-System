
import "./SupervisorDashboard.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import SubmitProposal from "./SubmitProposal.css";
import SupervisorSidebar from "../components/SupervisorSideBar";
import Supervisor from "../components/SupervisorSideBar.css";
import { FaTasks, FaChartLine, FaUsers, FaFileAlt } from "react-icons/fa";

const SupervisorDashboard = () => {
  const cards = [
    {
      id: 1,
      title: "Manage Tasks",
      description: "View, assign, and manage tasks for your team.",
      icon: <FaTasks />,
      action: "Go to Tasks",
    },
    {
      id: 2,
      title: "Performance Analytics",
      description: "Track team performance with real-time analytics.",
      icon: <FaChartLine />,
      action: "View Analytics",
    },
    {
      id: 3,
      title: "Team Members",
      description: "View and manage your team members.",
      icon: <FaUsers />,
      action: "Manage Team",
    },
    {
      id: 4,
      title: "Reports",
      description: "Access and review project reports and documents.",
      icon: <FaFileAlt />,
      action: "View Reports",
    },
  ];

  return (
    
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <SupervisorSidebar />
        <div className="main-content">
        <div className="supervisor-dashboard">
      <header className="dashboard-header">
        <h1>Supervisor Dashboard</h1>
        <p>Welcome! Manage your team and projects efficiently.</p>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-cards">
          {cards.map((card) => (
            <div className="dashboard-card" key={card.id}>
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <button className="card-action">{card.action}</button>
            </div>
          ))}
        </div>
      </main>
    </div>
          

          
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupervisorDashboard;
