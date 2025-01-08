import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentSidebar.css";

const StudentSidebar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const handleLogout = () => {
        console.log("Logging out...");
        setIsModalOpen(false); // Close the modal
        navigate("/"); // Redirect to homepage
    };

  const features = [
    { id: 0, name: "Dashboard", icon: "fas fa-home", path: "/dashboard" }, // Added Dashboard feature
    { id: 1, name: "View and Manage Deadlines", icon: "fas fa-calendar-alt", path: "/deadlines" },
    { id: 2, name: "View Assigned Tasks and Milestones", icon: "fas fa-tasks", path: "/tasks" },
    { id: 3, name: "Submit Proposals", icon: "fas fa-file-upload", path: "/proposals" },
    { id: 4, name: "Start Video Conference", icon: "fas fa-comments", path: "/chat" },
    { id: 5, name: "Upload Documentation", icon: "fas fa-upload", path: "/upload" },
    { id: 6, name: "View Feedback", icon: "fas fa-comment-dots", path: "/feedback" },
    { id: 7, name: "View FYP Recommendations", icon: "fas fa-lightbulb", path: "/recommendations" },
    { id: 8, name: "View Successful FYPs", icon: "fas fa-trophy", path: "/success" },
    { id: 9, name: "Access Communication Tools", icon: "fas fa-envelope", path: "/communication" },
    { id: 10, name: "Search Documents", icon: "fas fa-search", path: "/search" },
    { id: 11, name: "View Notifications", icon: "fas fa-bell", path: "/notifications" },
    { id: 12, name: "Logout", icon: "fas fa-sign-out-alt", path: "/logout" },
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
                            } else if (feature.name === "View and Manage Deadlines") {
                                navigate("/deadlines");
                            }
                            else if (feature.name === "View Assigned Tasks and Milestones") {
                                navigate("/tasks");
                            }
                            else if (feature.name === "Dashboard") {
                                navigate("/dashboard/student");
                            }
                            else if (feature.name === "Submit Proposals") {
                                navigate("/proposals");
                            }
                            else if (feature.name === "Start Video Conference") {
                                navigate("/video-conference");
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

export default StudentSidebar;
