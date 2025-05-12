import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./EvaluatorDashboard.css";

const EvaluatorDashboard = () => {
  // Hardcoded Assigned Groups
  const assignedGroups = [
    { id: 1, name: "Group A", project: "AI-based Attendance System", status: "Pending" },
    { id: 2, name: "Group B", project: "Smart Library System", status: "In Progress" },
    { id: 3, name: "Group C", project: "Blockchain Voting System", status: "Completed" },
    { id: 4, name: "Group D", project: "IoT-based Smart Agriculture", status: "Pending" },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-layout">
        <EvaluatorSideBar />

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="hero-section">
            <h1>Welcome, Evaluator!</h1>
            <p>Review and evaluate student projects efficiently.</p>
          </div>

          <div className="dashboard-content">
            {/* Evaluation Overview */}
            <div className="dashboard-section">
              <h2>Evaluation Overview</h2>
              <div className="card-grid">
                <div className="dashboard-card">
                  <i className="fas fa-tasks"></i>
                  <h3>Pending Evaluations</h3>
                  <p>{assignedGroups.filter((g) => g.status === "Pending").length} projects to review.</p>
                </div>
                <div className="dashboard-card">
                  <i className="fas fa-check-circle"></i>
                  <h3>Completed Evaluations</h3>
                  <p>{assignedGroups.filter((g) => g.status === "Completed").length} projects evaluated.</p>
                </div>
              </div>
            </div>

            {/* Assigned Groups */}
            <div className="dashboard-section">
              <h2>Assigned Groups</h2>
              <div className="groups-list">
                {assignedGroups.map((group) => (
                  <div key={group.id} className="group-card">
                    <h3>{group.name}</h3>
                    <p><strong>Project:</strong> {group.project}</p>
                    <p><strong>Status:</strong> <span className={`status ${group.status.toLowerCase()}`}>{group.status}</span></p>
                    <button className="evaluate-btn">Evaluate Now</button>
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

export default EvaluatorDashboard;
