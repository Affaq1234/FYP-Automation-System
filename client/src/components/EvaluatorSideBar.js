import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EvaluatorSideBar.css";

const EvaluatorSidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsModalOpen(false);
    navigate("/"); // Redirect to homepage
  };

  const features = [
    { id: 0, name: "Dashboard", icon: "fas fa-home", path: "/dashboard/evaluator" },
    { id: 1, name: "Assigned Groups", icon: "fas fa-users", path: "/assignedGroups" },
    { id: 2, name: "Project Evaluations", icon: "fas fa-history", path: "/ProjectEvaluation/:groupId" },
    { id: 3, name: "Past Evaluations", icon: "fas fa-history", path: "/PastEvaluation" },  
    { id: 4, name: "Logout", icon: "fas fa-sign-out-alt", path: "/Logout" },

  ];

  return (
    <>
      <aside className="dashboard-sidebar">
        <h2>Features</h2>
        <ul className="sidebar-list">
          {features.map((feature) => (
            <li
              key={feature.id}
              className={`sidebar-item ${feature.name === "Logout" ? "logout" : ""}`}
              onClick={() => {
                if (feature.name === "Logout") {
                  setIsModalOpen(true);
                }
                else if (feature.name === "Dashboard") {
                    navigate("/dashboard/evaluator");
                }
                else if (feature.name === "Assigned Groups") {
                    navigate("/assignedGroups");
                  } 
                  else if (feature.name === "Project Evaluations") {
                    navigate("/ProjectEvaluation/:groupId");
                  } else {
                  navigate(feature.path);
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

export default EvaluatorSidebar;
