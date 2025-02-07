import React, { useState } from "react";
import "./GroupManagement.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const GroupManagement = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Affaq",
      role: "Backend Developer",
      email: "affaq@example.com",
      profilePic: "https://via.placeholder.com/150",
      skills: "Node.js, Express, MongoDB",
    },
    {
      id: 2,
      name: "Asad",
      role: "API and Database Developer",
      email: "asad@example.com",
      profilePic: "https://via.placeholder.com/150",
      skills: "REST APIs, SQL, Firebase",
    },
    {
      id: 3,
      name: "Eman",
      role: "Frontend Developer (Mobile & Web)",
      email: "eman@example.com",
      profilePic: "https://via.placeholder.com/150",
      skills: "React Native, React.js, UI/UX Design",
    },
    {
      id: 4,
      name: "Ayesha",
      role: "Frontend Developer (Web)",
      email: "ayesha@example.com",
      profilePic: "https://via.placeholder.com/150",
      skills: "React.js, HTML, CSS, JavaScript",
    },
  ]);

  const [activityLogs, setActivityLogs] = useState([
    { id: 1, message: "Affaq assigned as Developer", timestamp: "2023-10-01 10:00 AM" },
    { id: 2, message: "Asad assigned as Tester", timestamp: "2023-10-01 10:30 AM" },
  ]);

  const [isAdmin, setIsAdmin] = useState(false); // Simulate admin/student role

  const updateRole = (id, newRole) => {
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, role: newRole } : member
    );
    setMembers(updatedMembers);
    setActivityLogs([
      ...activityLogs,
      { id: activityLogs.length + 1, message: `Role updated for ${id}`, timestamp: new Date().toLocaleString() },
    ]);
  };

  const addMember = () => {
    if (members.length >= 4) {
      alert("Maximum group size is 4 members.");
      return;
    }
    const newMember = {
      id: members.length + 1,
      name: "New Member",
      role: "Unassigned",
      email: "new@example.com",
      profilePic: "https://via.placeholder.com/150",
      skills: "N/A",
    };
    setMembers([...members, newMember]);
    setActivityLogs([
      ...activityLogs,
      { id: activityLogs.length + 1, message: "New member added", timestamp: new Date().toLocaleString() },
    ]);
  };

  const removeMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    setActivityLogs([
      ...activityLogs,
      { id: activityLogs.length + 1, message: `Member ${id} removed`, timestamp: new Date().toLocaleString() },
    ]);
  };

  return (
    <div className="group-management-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="title">Group Management</h1>

          {/* Group Details */}
          <div className="group-details">
            <h2>Group Details</h2>
            <div className="group-info">
              <p><strong>Group Number:</strong> G-37</p>
              <p><strong>Project Title:</strong> Project Management System</p>
              <p><strong>Supervisor:</strong> Prof. Dr. Shazia Arshad</p>
            </div>
          </div>

          {/* Team Member Profiles */}
          <div className="profiles-section">
            <h2>Team Member Profiles</h2>
            <ul>
              {members.map((member) => (
                <li key={member.id} className="member-card">
                  <img src={member.profilePic} alt={member.name} className="profile-pic" />
                  <div className="member-info">
                    <p><strong>Name:</strong> {member.name}</p>
                    <p><strong>Role:</strong> {member.role}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Skills:</strong> {member.skills}</p>
                    {isAdmin && (
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
                    )}
                    {isAdmin && (
                      <button onClick={() => removeMember(member.id)} className="remove-button">
                        Remove Member
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {isAdmin && members.length < 4 && (
              <button onClick={addMember} className="add-member-button">
                Add Member
              </button>
            )}
          </div>

          {/* Communication Channels */}
          <div className="communication-section">
            <h2>Group Communication Channels</h2>
            <div className="communication-buttons">
              <button onClick={() => window.open("https://zoom.us", "_blank")}>
                Start Zoom Meeting
              </button>
              <button onClick={() => window.open("https://meet.google.com", "_blank")}>
                Start Google Meet
              </button>
              <button onClick={() => window.open("https://teams.microsoft.com", "_blank")}>
                Start Microsoft Teams
              </button>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="logs-section">
            <h2>Activity Logs</h2>
            <ul>
              {activityLogs.map((log) => (
                <li key={log.id} className="log-item">
                  <span className="log-timestamp">{log.timestamp}</span> - {log.message}
                </li>
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