import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./manageUserAccounts.css";
import AdminSidebar from "../components/AdminSideBar"; 
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ManageUserAccounts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState(""); // Added registration number state
  const [students, setStudents] = useState([]); // State to store students data
  const [viewStudents, setViewStudents] = useState(false); // State to toggle the visibility of the student table

  // Assume the current user's role (replace this with actual logic)
  const currentUserRole = "Supervisor"; // Replace with actual logic to fetch the logged-in user role
  const currentUserName = "John Doe"; // Replace with actual logged-in user's name

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new student to the students array with registration number
    const newStudent = { name, email, role, registrationNumber };
    setStudents([...students, newStudent]);

    // Reset form fields
    setName("");
    setEmail("");
    setRole("");
    setRegistrationNumber(""); // Reset registration number

    // Automatically show the table after form submission
    setViewStudents(true);
  };

  return (
    <div className="manage-user-accounts">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="main-content">
          <div className="header1">
            <h1>Manage User Accounts</h1>
            <p>Add or edit accounts for students and supervisors</p>
          </div>

          {/* Directly apply form styles inside .manage-user-accounts */}
          <div className="user-form-container">
            <h2>Add / Edit User</h2>
            {/* Only allow adding/editing users if the current user is a supervisor */}
            {currentUserRole !== "Student" ? (
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
                <label htmlFor="registrationNumber">Registration Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="Enter registration number"
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
            ) : (
              <p>You do not have permission to add/edit users. Only supervisors can perform this action.</p>
            )}
          </div>

          {/* Display Student Table automatically after form submission */}
          {viewStudents && students.length > 0 && (
            <div className="student-table">
              <h2>User List</h2>
              <table>
                <thead>
                  <tr>
                    {/* Conditionally render columns based on user role */}
                    {currentUserRole === "Student" && (
                      <>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Registration Number</th>
                      </>
                    )}
                    {currentUserRole === "Supervisor" && (
                      <>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Registration Number</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter(student => student.name !== currentUserName && student.role !== "Supervisor") // Filter out the supervisor's own data
                    .map((student, index) => (
                      <tr key={index}>
                        {/* Render name, email, role, and registration number for students */}
                        {currentUserRole === "Student" && (
                          <>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.role}</td>
                            <td>{student.registrationNumber}</td>
                          </>
                        )}

                        {/* Render name, role, and registration number for supervisors */}
                        {currentUserRole === "Supervisor" && (
                          <>
                            <td>{student.name}</td>
                            <td>{student.role}</td>
                            <td>{student.registrationNumber}</td>
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {viewStudents && students.length === 0 && (
            <p>No students available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageUserAccounts;
