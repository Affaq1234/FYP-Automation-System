import React, { useState } from "react";
import "./ViewTasks.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewTasks = () => {
  const [filter, setFilter] = useState("all");
  const tasks = [
    { id: 1, title: "Complete Research Proposal", status: "Pending", deadline: "2025-01-15" },
    { id: 2, title: "Prepare Presentation", status: "Completed", deadline: "2025-01-10" },
    { id: 3, title: "Submit Progress Report", status: "In Progress", deadline: "2025-01-20" },
  ];

  const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

  return (
    <div className="tasks-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="tasks-title">View Assigned Tasks and Milestones</h1>

          {/* Filter Section */}
          <div className="filter-section">
            <label htmlFor="filter">Filter by Status:</label>
            <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Tasks Table */}
          <div className="tasks-table">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>{task.deadline}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No tasks found for the selected filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewTasks;
