import React, { useState } from "react";
import "./GroupManagement.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const GroupManagement = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", role: "Developer", email: "john@example.com" },
    { id: 2, name: "Sarah Smith", role: "Tester", email: "sarah@example.com" },
  ]);
  const [activityLogs, setActivityLogs] = useState([
    "John assigned as Developer",
    "Sarah assigned as Tester",
  ]);

  const updateRole = (id, newRole) => {
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, role: newRole } : member
    );
    setMembers(updatedMembers);
    setActivityLogs([...activityLogs, `Role updated for ${id}`]);
  };

  return (
    <div className="group-management-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="title">Group Management</h1>

          {/* Team Member Profiles */}
          <div className="profiles-section">
            <h2>Team Member Profiles</h2>
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  <p>
                    <strong>Name:</strong> {member.name}
                  </p>
                  <p>
                    <strong>Role:</strong> {member.role}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <label>
                    Update Role:
                    <select
                      value={member.role}
                      onChange={(e) => updateRole(member.id, e.target.value)}
                    >
                      <option value="Developer">Developer</option>
                      <option value="Tester">Tester</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Communication Channels */}
          <div className="communication-section">
            <h2>Group Communication Channels</h2>
            <button onClick={() => window.open("https://zoom.us", "_blank")}>
              Start Zoom Meeting
            </button>
            
          </div>

          {/* Activity Logs */}
          <div className="logs-section">
            <h2>Activity Logs</h2>
            <ul>
              {activityLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupManagement;
