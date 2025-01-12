import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSideBar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const handleLogout = () => {
        console.log("Logging out...");
        setIsModalOpen(false); // Close the modal
        navigate("/"); // Redirect to homepage
    };

  const features = [
    { id: 0, name: "Manage User Accounts", icon: "fas fa-home", path: "/manageUserAccounts" }, // Added Dashboard feature
    { id: 1, name: "Backup and Restore", icon: "fas fa-calendar-alt", path: "/BackupAndRestore" },
    { id: 2, name: "Reset System", icon: "fas fa-tasks", path: "/ResetSystem" },
    { id: 3, name: "Search Documents", icon: "fas fa-search", path: "/search" },
    { id: 4, name: "View Notifications", icon: "fas fa-bell", path: "/notifications" },
    { id: 5, name: "Access Communication Tools", icon: "fas fa-envelope", path: "/communication" },
    { id: 6, name: "Logout", icon: "fas fa-sign-out-alt", path: "/logout" },
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
                            } else if (feature.name === "Manage User Accounts") {
                                navigate("/manageUserAccounts");
                            }
                            else if (feature.name === "Backup and Restore") {
                                navigate("/BackupAndRestore");
                            }
                            else if (feature.name === "Reset System") {
                                navigate("/ResetSystem");
                            }
                            else if (feature.name === "Search Documents") {
                                navigate("/dashboard/student");
                            }
                            else if (feature.name === "View Notifications") {
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

export default AdminSidebar;
