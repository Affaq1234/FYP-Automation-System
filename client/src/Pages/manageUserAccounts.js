import React, { useState } from "react";
import "./manageUserAccounts.css";
import AdminSidebar from "../components/AdminSideBar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ManageUserAccounts() {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  // State for user lists
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  // State to control table visibility
  const [viewStudents, setViewStudents] = useState(false);
  const [viewSupervisors, setViewSupervisors] = useState(false);

  // Function to generate a secure random password
  const generatePassword = () => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "@$!%*?&";

    const allChars = lowerCase + upperCase + numbers + specialChars;

    let generatedPassword = "";
    generatedPassword += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    generatedPassword += upperCase[Math.floor(Math.random() * upperCase.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the remaining characters randomly
    for (let i = 4; i < 8; i++) {
      generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return generatedPassword.split("").sort(() => 0.5 - Math.random()).join("");
  };

  // Function to handle role change and generate password for non-students
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole !== "Student" && selectedRole !== "") {
      setPassword(generatePassword());
    } else {
      setPassword(""); // Reset password if Student is selected
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, role, registrationNumber, password };

    if (role === "Student") {
      setStudents([...students, newUser]);
      setViewStudents(true);
    } else {
      setSupervisors([...supervisors, newUser]);
      setViewSupervisors(true);
    }

    // Clear form inputs
    setName("");
    setEmail("");
    setRole("");
    setRegistrationNumber("");
    setPassword("");
  };

  return (
    <div className="manage-user-accounts">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="main-content">
          <h1>Manage User Accounts</h1>
          <p>Add or edit accounts for students and supervisors.</p>

          {/* User Form Section */}
          <div className="user-form-container">
            <h2>Add / Edit User</h2>
            <form onSubmit={handleSubmit} className="user-form">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />

              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />

              <label htmlFor="role">Role</label>
              <select 
                id="role" 
                value={role} 
                onChange={handleRoleChange} 
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Evaluator">Evaluator</option>
                <option value="Admin">Admin</option>
              </select>

              {/* Registration Number field only for students */}
              {role === "Student" && (
                <>
                  <label htmlFor="registrationNumber">Registration Number</label>
                  <input 
                    type="text" 
                    id="registrationNumber" 
                    value={registrationNumber} 
                    onChange={(e) => setRegistrationNumber(e.target.value)} 
                    required 
                  />
                </>
              )}

              {/* Auto-generated password for other roles */}
              {role !== "Student" && role !== "" && (
                <>
                  <label htmlFor="password">Generated Password</label>
                  <input 
                    type="text" 
                    id="password" 
                    value={password} 
                    readOnly 
                  />
                </>
              )}

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* Student List Table */}
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

          {/* Supervisor List Table */}
          {viewSupervisors && supervisors.length > 0 && (
            <div className="supervisor-table">
              <h2>Supervisor List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor, index) => (
                    <tr key={index}>
                      <td>{supervisor.name}</td>
                      <td>{supervisor.email}</td>
                      <td>{supervisor.role}</td>
                      <td>{supervisor.password}</td> {/* Show generated password */}
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
