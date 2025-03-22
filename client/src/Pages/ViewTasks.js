import React, { useState } from "react";
import "./ViewTasks.css"; 
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import StudentSidebar from "../components/StudentSidebar"; 

const ViewTasks = () => {
  // State to manage the list of milestones
  const [milestones, setMilestones] = useState([]);

  // State to store new milestone input
  const [newMilestone, setNewMilestone] = useState("");

  // State for new task input fields
  const [newTask, setNewTask] = useState({
    title: "",
    creator: "",
    status: "Pending",
    completedBy: "",
    createdAt: "",
    deadline: "",
  });

  // Function to add a new milestone
  const handleAddMilestone = () => {
    if (!newMilestone.trim()) {
      alert("Please enter a milestone name.");
      return;
    }
    const newMilestoneObj = {
      id: Date.now(),
      name: newMilestone,
      tasks: [], // Each milestone starts with an empty task list
      createdAt: new Date().toLocaleString(),
    };
    setMilestones([...milestones, newMilestoneObj]);
    setNewMilestone(""); // Clear input field after adding
  };

  // Function to add a new task under a specific milestone
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
    // Reset task fields after adding
    setNewTask({ title: "", creator: "", status: "Pending", completedBy: "", createdAt: "", deadline: "" });
  };

  // Function to update task status (e.g., mark as completed)
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

          {/* Input Field for Adding a Milestone */}
          <div className="milestone-section">
            <input 
              type="text" 
              value={newMilestone} 
              onChange={(e) => setNewMilestone(e.target.value)} 
              placeholder="Add a new milestone" 
            />
            <button onClick={handleAddMilestone}>Add Milestone</button>
          </div>

          {/* List of Milestones with Tasks */}
          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="milestone-item">
                <h2>{milestone.name}</h2>
                <p>Created on: {milestone.createdAt}</p>

                {/* Input Fields for Adding a Task to the Milestone */}
                <div className="task-section">
                  <input 
                    type="text" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                    placeholder="Task title" 
                  />
                  <input 
                    type="text" 
                    value={newTask.creator} 
                    onChange={(e) => setNewTask({ ...newTask, creator: e.target.value })} 
                    placeholder="Created by" 
                  />
                  <button className="task-button" onClick={() => handleAddTask(milestone.id)}>Add Task</button>

                  {/* Table of Tasks Under the Milestone */}
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
