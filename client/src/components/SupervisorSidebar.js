import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorSidebar.css"; // Create a CSS file or reuse styles from StudentSidebar.css

const SupervisorSidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsModalOpen(false);
    navigate("/"); // Redirect to homepage
  };

  const features = [
    { id: 0, name: "Dashboard", icon:  "fas fa-home", path: "/dashboard" },
    { id: 1, name: "Provide Feedback", icon: "fas fa-comment-dots", path: "/provide-feedback" },
    { id: 2, name: "Schedule Meetings", icon: "fas fa-calendar", path: "/schedule-meeting" },
    { id: 3, name: "Approve Proposals", icon: "fas fa-check", path: "/approve-proposal" },
    { id: 4, name: "Generate Reports", icon: "fas fa-file-alt", path: "/generate-reports" },   
    { id: 5, name: "View and Track Progress", icon: "fas fa-chart-line", path: "/track-progress" },
    { id: 6, name: "Search Documents", icon:  "fas fa-search", path: "/search-documents" },

    { id: 10, name: "Logout", icon: "fas fa-sign-out-alt", path: "/logout" },
  ];

  return (
    <>
      <aside className="dashboard-sidebar">
        <h2>Supervisor Features</h2>
        <ul className="sidebar-list">
          {features.map((feature) => (
            <li
              key={feature.id}
              className={`sidebar-item ${feature.name === "Logout" ? "logout" : ""}`}
              onClick={() => {
                if (feature.name === "Logout") {
                  setIsModalOpen(true);
                } else if (feature.name === "Dashboard") {
                  navigate("/dashboard/Supervisor");
                } else if (feature.name === "Provide Feedback"){
                  navigate("/provide-feedback")
                } else if(feature.name === "Schedule Meetings"){
                  navigate("/schedule-meeting")
                } else if(feature.name === "Approve Proposals"){
                  navigate("/approve-proposal")
                }
              
              }}
            >
              <i className={feature.icon}></i>
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="btn-confirm" onClick={handleLogout}>
              Yes
            </button>
            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupervisorSidebar;
