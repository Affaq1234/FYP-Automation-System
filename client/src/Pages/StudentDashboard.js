import "./StudentDashboard.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import StudentSidebar from "../components/StudentSidebar";

const StudentDashboard = () => {
  const milestones = [
    { id: 1, title: "Milestone 1", description: "Proposal Submission", completion: 80 },
    { id: 2, title: "Milestone 2", description: "Mid-Term Report", completion: 40 },
    { id: 3, title: "Milestone 3", description: "Final Project Presentation", completion: 20 },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-layout">
        <StudentSidebar /> {/* Ensure the sidebar height is fixed */}

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="hero-section">
            <h1>Welcome, [Student Name]!</h1>
            <p>Track your progress and stay updated with the latest milestones.</p>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-section">
              <h2>Your Tasks</h2>
              <div className="card-grid">
                <div className="dashboard-card">
                  <i className="fas fa-tasks"></i>
                  <h3>Pending Tasks</h3>
                  <p>Complete documentation for the second milestone.</p>
                </div>
                <div className="dashboard-card">
                  <i className="fas fa-check-circle"></i>
                  <h3>Completed Tasks</h3>
                  <p>Proposal submission successfully reviewed.</p>
                </div>
              </div>
            </div>

            {/* Milestones Section */}
            <div className="dashboard-section">
              <h2>Milestones</h2>
              <div className="milestones-list">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="milestone-card">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                    <p>Completion: {milestone.completion}%</p>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${milestone.completion}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
