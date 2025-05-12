import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./manageUserAccounts.css";
import AdminSidebar from "../components/AdminSideBar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const API_BASE = "http://localhost:5000/api";

function ManageUserAccounts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [evaluators, setEvaluators] = useState([]);

  const [viewStudents, setViewStudents] = useState(false);
  const [viewSupervisors, setViewSupervisors] = useState(false);
  const [viewEvaluators, setViewEvaluators] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingType, setEditingType] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersRes, studentsRes] = await Promise.all([
          axios.get(`${API_BASE}/user`),
          axios.get(`${API_BASE}/student`),
        ]);

        const allUsers = usersRes.data;
        const studentDetails = studentsRes.data;

        const studentUsers = allUsers
          .filter((u) => u.role === "Student")
          .map((user) => {
            const studentDetail = studentDetails.find(
              (s) => s.userId === user._id
            );
            return {
              ...user,
              regNo: studentDetail?.regNo || "",
            };
          });

        setStudents(studentUsers);
        setSupervisors(allUsers.filter((u) => u.role === "Supervisor"));
        setEvaluators(allUsers.filter((u) => u.role === "Evaluator"));

        setViewStudents(true);
        setViewSupervisors(true);
        setViewEvaluators(true);
      } catch (err) {
        console.error("Failed to fetch users or students", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPayload = {
      username: name,
      email,
      password,
      role,
    };

    try {
      if (editingIndex !== null) {
        const currentList =
          editingType === "student"
            ? students
            : editingType === "supervisor"
            ? supervisors
            : evaluators;

        const userId = currentList[editingIndex]._id;
        await axios.patch(`${API_BASE}/user/${userId}`, userPayload);

        // Also update regNo for student if applicable
        if (editingType === "student") {
          const studentDetail = await axios.get(`${API_BASE}/student`);
          const student = studentDetail.data.find((s) => s.userId === userId);
          if (student) {
            await axios.patch(`${API_BASE}/student/${student._id}`, {
              regNo: registrationNumber,
            });
          }
        }
      } else {
        const userRes = await axios.post(`${API_BASE}/user`, userPayload);
        const user = userRes.data;

        if (role === "Student") {
          await axios.post(`${API_BASE}/student`, {
            userId: user._id,
            studentName: name,
            regNo: registrationNumber,
            isGrouped: false,
          });
        } else if (role === "Supervisor") {
          await axios.post(`${API_BASE}/facultyadvisor`, {
            userId: user._id,
            Name: name,
            Meetings: [],
          });
        } else if (role === "Evaluator") {
          await axios.post(`${API_BASE}/evaluator`, {
            userId: user._id,
            name,
          });
        }
      }

      window.location.reload();
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Error creating/updating user.");
    }

    setName("");
    setEmail("");
    setRole("");
    setRegistrationNumber("");
    setPassword("");
    setEditingIndex(null);
    setEditingType("");
  };

  const handleEdit = (index, type) => {
    setEditingIndex(index);
    setEditingType(type);
    const user =
      type === "student"
        ? students[index]
        : type === "supervisor"
        ? supervisors[index]
        : evaluators[index];

    setName(user.username);
    setEmail(user.email);
    setRole(user.role);
    setRegistrationNumber(user.regNo || "");
    setPassword("");
  };

  const handleResetPassword = async (index, type) => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    const list =
      type === "student"
        ? students
        : type === "supervisor"
        ? supervisors
        : evaluators;

    const user = list[index];

    try {
      await axios.patch(`${API_BASE}/user/${user._id}`, {
        password: newPassword,
      });
      alert("Password reset successfully.");
    } catch (err) {
      console.error("Failed to reset password", err);
      alert("Password reset failed.");
    }
  };

  const handleDelete = async (index, type) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const list =
      type === "student"
        ? students
        : type === "supervisor"
        ? supervisors
        : evaluators;

    const user = list[index];

    try {
      await axios.delete(`${API_BASE}/user/${user._id}`);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Deletion failed.");
    }
  };

  return (
    <div className="manage-user-accounts">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="main-content">
          <h1>Manage User Accounts</h1>
          <p>Add or edit accounts for students, supervisors, and evaluators</p>

          <div className="user-form-container">
            <h2>{editingIndex !== null ? "Edit User" : "Add / Edit User"}</h2>
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

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <option value="Evaluator">Evaluator</option>
              </select>

              {role === "Student" && (
                <>
                  <label htmlFor="registrationNumber">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />
                </>
              )}

              {role === "Evaluator" && (
                <>
                  <label htmlFor="registrationNumber">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    disabled
                    placeholder="Not applicable"
                  />
                </>
              )}

              <button type="submit" className="submit-btn">
                {editingIndex !== null ? "Update" : "Submit"}
              </button>
            </form>
          </div>
          <div className="toggle-buttons">
            <button onClick={() => setViewStudents(!viewStudents)}>
              {viewStudents ? "Hide" : "Show"} Students
            </button>
            <button onClick={() => setViewSupervisors(!viewSupervisors)}>
              {viewSupervisors ? "Hide" : "Show"} Supervisors
            </button>
            <button onClick={() => setViewEvaluators(!viewEvaluators)}>
              {viewEvaluators ? "Hide" : "Show"} Evaluators
            </button>
          </div>

          {/* Student Table */}
          {viewStudents && students.length > 0 && (
            <div className="student-table height_restrict">
              <h2>Student List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Reg No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.username}</td>
                      <td>{student.email}</td>
                      <td>{student.role}</td>
                      <td>{student.regNo}</td>
                      <td>
                        <button onClick={() => handleEdit(index, "student")}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleResetPassword(index, "student")}
                        >
                          Reset Password
                        </button>
                        <button onClick={() => handleDelete(index, "student")}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Supervisor Table */}
          {viewSupervisors && supervisors.length > 0 && (
            <div className="supervisor-table height_restrict">
              <h2>Supervisor List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor, index) => (
                    <tr key={index}>
                      <td>{supervisor.username}</td>
                      <td>{supervisor.email}</td>
                      <td>{supervisor.role}</td>
                      <td>
                        <button onClick={() => handleEdit(index, "supervisor")}>
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleResetPassword(index, "supervisor")
                          }
                        >
                          Reset Password
                        </button>
                        <button
                          onClick={() => handleDelete(index, "supervisor")}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Evaluator Table */}
          {viewEvaluators && evaluators.length > 0 && (
            <div className="supervisor-table height_restrict">
              <h2>Evaluator List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluators.map((evaluator, index) => (
                    <tr key={index}>
                      <td>{evaluator.username}</td>
                      <td>{evaluator.email}</td>
                      <td>{evaluator.role}</td>
                      <td>
                        <button onClick={() => handleEdit(index, "evaluator")}>
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleResetPassword(index, "evaluator")
                          }
                        >
                          Reset Password
                        </button>
                        <button
                          onClick={() => handleDelete(index, "evaluator")}
                        >
                          Delete
                        </button>
                      </td>
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
