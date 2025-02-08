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
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [viewStudents, setViewStudents] = useState(false);
  const [viewSupervisors, setViewSupervisors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, role, registrationNumber };

    if (role === "Student") {
      setStudents([...students, newUser]);
      setViewStudents(true);
    } else {
      setSupervisors([...supervisors, newUser]);
      setViewSupervisors(true);
    }

    setName("");
    setEmail("");
    setRole("");
    setRegistrationNumber("");
  };

  return (
    <div className="manage-user-accounts">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="main-content">
          <h1>Manage User Accounts</h1>
          <p>Add or edit accounts for students and supervisors</p>

          <div className="user-form-container">
            <h2>Add / Edit User</h2>
            <form onSubmit={handleSubmit} className="user-form">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Evaluator">Evaluator</option>
              </select>
              
              {role === "Student" && (
                <>
                  <label htmlFor="registrationNumber">Registration Number</label>
                  <input type="text" id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
                </>
              )}
              
              {role === "Evaluator" && (
                <>
                  <label htmlFor="registrationNumber">Registration Number</label>
                  <input type="text" id="registrationNumber" disabled placeholder="Not applicable" />
                </>
              )}
              
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* Separate Tables for Students & Supervisors */}
          {viewStudents && students.length > 0 && (
            <div className="student-table">
              <h2>Student List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registration Number</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.role}</td>
                      <td>{student.registrationNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewSupervisors && supervisors.length > 0 && (
            <div className="supervisor-table">
              <h2>Supervisor List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor, index) => (
                    <tr key={index}>
                      <td>{supervisor.name}</td>
                      <td>{supervisor.email}</td>
                      <td>{supervisor.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageUserAccounts;
