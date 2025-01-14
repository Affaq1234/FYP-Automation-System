import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorSideBar.css";

const SupervisorSidebar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const handleLogout = () => {
        console.log("Logging out...");
        setIsModalOpen(false); // Close the modal
        navigate("/"); // Redirect to homepage
    };

    const features = [
        { id: 0, name: "Dashboard", icon: "fas fa-home", path: "/SupervisorDashboad" },
        { id: 0, name: "Generate Reports", icon: "fas fa-file-alt", path: "/generateReports" }, // Added Dashboard feature
        { id: 1, name: "Approved Proposal", icon: "fas fa-calendar-alt", path: "/deadlines" },
        { id: 2, name: "View and Track Progress", icon: "fas fa-tasks", path: "/tasks" },
        { id: 3, name: "Shedule Meetings", icon: "fas fa-clock", path: "/Meeting" },
        { id: 4, name: "Communication History", icon: "fas fa-upload", path: "/upload" },
        { id: 5, name: "Feedback", icon: "fas fa-comment-dots", path: "/feedback" },
        { id: 6, name: "Access Communication Tools", icon: "fas fa-envelope", path: "/communication" },
        { id: 7, name: "Search Documents", icon: "fas fa-search", path: "/SearchDocument" },
        { id: 8, name: "View Notifications", icon: "fas fa-bell", path: "/notifications" },
        { id: 9, name: "Logout", icon: "fas fa-sign-out-alt", path: "/logout" },
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
                                setIsModalOpen(true); // Open the modal
                            } else if (feature.name === "Search Documents") {
                                navigate("/SearchDocument");
                            }
                            else if (feature.name === "Shedule Meetings") {
                                console.log('Navigating to /Meeting');
                                navigate("/Meeting");
                            }
                            else if (feature.name === "Generate Reports") {
                                navigate("/generateReports");
                            }
                            else if (feature.name === "Submit Proposals") {
                                navigate("/proposals");
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
