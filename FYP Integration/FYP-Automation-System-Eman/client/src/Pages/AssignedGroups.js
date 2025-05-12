import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./AssignedGroups.css";

const AssignedGroups = () => {
  const navigate = useNavigate(); 

  // List of assigned groups with project details and status
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

        {/* Page header section */}
        <main className="dashboard-main">
          <div className="hero-section">
            <h1>Assigned Groups</h1>
            <p>View all the groups assigned to you and evaluate their progress.</p>
          </div>

          {/* Table displaying assigned groups */}
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h2>Your Assigned Groups</h2>
              <table className="groups-table">
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Project Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedGroups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.name}</td>
                      <td>{group.project}</td>
                      <td>
                        {/* Display status with different styles based on value */}
                        <span className={`status ${group.status.toLowerCase()}`}>
                          {group.status}
                        </span>
                      </td>
                      <td>
                        {/* Button to navigate to the project evaluation page */}
                        <button
                          className="evaluate-btn"
                          onClick={() => navigate(`/ProjectEvaluation/${group.id}`)}
                        >
                          Evaluate Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AssignedGroups;
