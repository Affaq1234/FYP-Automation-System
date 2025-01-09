import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentSidebar.css";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsModalOpen(false);
    navigate("/"); // Redirect to homepage
  };

  const features = [
    { id: 0, name: "Dashboard", icon: "fas fa-home", path: "/dashboard" },
    { id: 1, name: "View and Manage Deadlines", icon: "fas fa-calendar-alt", path: "/deadlines" },
    { id: 2, name: "View Assigned Tasks and Milestones", icon: "fas fa-tasks", path: "/tasks" },
    { id: 3, name: "Submit Proposals", icon: "fas fa-file-upload", path: "/proposals" },
    { id: 4, name: "Start Video Conference", icon: "fas fa-comments", path: "/video-conference" },
    { id: 5, name: "Upload Documentation", icon: "fas fa-upload", path: "/upload-documentation" },
    { id: 6, name: "Group Management", icon: "fas fa-users", path: "/group" }, // Fixed icon
    { id: 7, name: "View Feedback", icon: "fas fa-comment-dots", path: "/view-feedback" },
    { id: 8, name: "View FYP Recommendations", icon: "fas fa-lightbulb", path: "/fyo-recommendations" },
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
                  setIsModalOpen(true);
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
                else if (feature.name === "Upload Documentation") {
                    navigate("/upload-documentation");
                }
                else if (feature.name === "View Feedback") {
                    navigate("/view-feedback");
                }
                else if (feature.name === "View FYP Recommendations") {
                    navigate("/fyp-recommendations");
                }
                else if (feature.name === "Group Management") {
                    navigate("/group-management");
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


/* export default StudentSidebar;
else if (feature.name === "View and Manage Deadlines") {
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
else if (feature.name === "Upload Documentation") {
    navigate("/upload-documentation");
}
else if (feature.name === "View Feedback") {
    navigate("/view-feedback");
}
else if (feature.name === "View FYP Recommendations") {
    navigate("/fyp-recommendations");
}
else if (feature.name === "Group Management") {
    navigate("/group");
} */