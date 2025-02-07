import React, { useState } from "react";
import "./ViewTasks.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewTasks = () => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState({ title: "", creator: "", status: "Pending", completedBy: "", createdAt: "", deadline: "" });
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [editedMilestoneName, setEditedMilestoneName] = useState("");

  const handleAddMilestone = () => {
    if (!newMilestone.trim()) {
      alert("Please enter a milestone name.");
      return;
    }
    const newMilestoneObj = {
      id: Date.now(),
      name: newMilestone,
      tasks: [],
      createdAt: new Date().toLocaleString(),
    };
    setMilestones([...milestones, newMilestoneObj]);
    setNewMilestone("");
  };

  const handleAddTask = (milestoneId) => {
    if (!newTask.title.trim() || !newTask.creator.trim()) {
      alert("Please fill in all task fields.");
      return;
    }
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: [...milestone.tasks, { ...newTask, id: Date.now(), createdAt: new Date().toLocaleString() }],
            }
          : milestone
      )
    );
    setNewTask({ title: "", creator: "", status: "Pending", completedBy: "", createdAt: "", deadline: "" });
  };

  const handleUpdateTaskStatus = (milestoneId, taskId, newStatus, studentName) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, status: newStatus, completedBy: studentName, completedAt: new Date().toLocaleString() }
                  : task
              ),
            }
          : milestone
      )
    );
  };

  return (
    <div className="tasks-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="tasks-title">Manage Milestones and Tasks</h1>

          <div className="milestone-section">
            <input type="text" value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)} placeholder="Add a new milestone" />
            <button onClick={handleAddMilestone}>Add Milestone</button>
          </div>

          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="milestone-item">
                <h2>{milestone.name}</h2>
                <p>Created on: {milestone.createdAt}</p>

                <div className="task-section">
                  <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} placeholder="Task title" />
                  <input type="text" value={newTask.creator} onChange={(e) => setNewTask({ ...newTask, creator: e.target.value })} placeholder="Created by" />
                  <button className="task-button" onClick={() => handleAddTask(milestone.id)}>Add Task</button>

                  <div className="tasks-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Task</th>
                          <th>Creator</th>
                          <th>Status</th>
                          <th>Completed By</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {milestone.tasks.map((task) => (
                          <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.creator}</td>
                            <td>{task.status}</td>
                            <td>{task.completedBy || "N/A"}</td>
                            <td>{task.createdAt}</td>
                            <td>
                              <button className="mark-completed-button" onClick={() => handleUpdateTaskStatus(milestone.id, task.id, "Completed", "Student X")}>
                                Mark as Completed
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewTasks;