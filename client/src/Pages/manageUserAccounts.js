import React, { useState } from "react";
import "./manageUserAccounts.css";
import AdminSidebar from "../components/AdminSideBar";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ManageUserAccounts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [groupName, setGroupName] = useState(""); // State for group name
  const [studentName, setStudentName] = useState(""); // State for student name
  const [rollNumber, setRollNumber] = useState(""); // State for roll number
  const [projectName, setProjectName] = useState(""); // State for project name
  const [studentsInGroup, setStudentsInGroup] = useState([]); // Array to store students in the group

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", { name, email, role });
    // Reset form fields
    setName("");
    setEmail("");
    setRole("");
  };

  const handleAddStudentToGroup = (e) => {
    e.preventDefault();
    const newStudent = {
      name: studentName,
      rollNumber,
      projectName,
    };
    setStudentsInGroup([...studentsInGroup, newStudent]);

    // Reset student fields after adding
    setStudentName("");
    setRollNumber("");
    setProjectName("");
  };

  return (
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="manage-user-accounts">
          <div className="header1">
            <h1>Manage User Accounts</h1>
            <p>Add or edit accounts for students and supervisors</p>
          </div>

          <div className="form-container">
            {/* User Form Section */}
            <div className="card">
              <h2>Add / Edit User</h2>
              <form onSubmit={handleSubmit} className="user-form">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />

                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Supervisor">Supervisor</option>
                </select>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>

            {/* Group Form Section */}
            <div className="card">
              <h2>Create Group of Students</h2>
              <form onSubmit={handleAddStudentToGroup} className="user-form">
                <label htmlFor="group-name">Group Name</label>
                <input
                  type="text"
                  id="group-name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />

                <label htmlFor="student-name">Student Name</label>
                <input
                  type="text"
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  required
                />

                <label htmlFor="roll-number">Roll Number</label>
                <input
                  type="text"
                  id="roll-number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter roll number"
                  required
                />

                <label htmlFor="project-name">Project Name</label>
                <input
                  type="text"
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  required
                />

                <button type="submit" className="submit-btn">
                  Add Student to Group
                </button>
              </form>
            </div>

            {/* Display Group Students */}
            {studentsInGroup.length > 0 && (
              <div className="card">
                <h3>Students in Group: {groupName}</h3>
                <ul className="student-list">
                  {studentsInGroup.map((student, index) => (
                    <li key={index}>
                      {student.name} - {student.rollNumber} - {student.projectName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageUserAccounts;
