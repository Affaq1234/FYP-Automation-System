import React, { useState } from "react";
import "./ViewTasks.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewTasks = () => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState({ title: "", creator: "" });
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [editedMilestoneName, setEditedMilestoneName] = useState("");

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      const newMilestoneObj = {
        id: Date.now(),
        name: newMilestone,
        tasks: [],
      };
      setMilestones([...milestones, newMilestoneObj]);
      setNewMilestone("");
    }
  };

  const handleAddTask = (milestoneId) => {
    if (newTask.title.trim() && newTask.creator.trim()) {
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) =>
          milestone.id === milestoneId
            ? {
                ...milestone,
                tasks: [...milestone.tasks, { ...newTask, id: Date.now() }],
              }
            : milestone
        )
      );
      setNewTask({ title: "", creator: "" });
    }
  };

  const handleDeleteTask = (milestoneId, taskId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.filter((task) => task.id !== taskId),
            }
          : milestone
      )
    );
  };

  const handleDeleteMilestone = (milestoneId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.filter((milestone) => milestone.id !== milestoneId)
    );
  };

  const handleEditMilestone = (milestoneId) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    setEditingMilestone(milestoneId);
    setEditedMilestoneName(milestone.name);
  };

  const handleSaveEditedMilestone = (milestoneId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, name: editedMilestoneName }
          : milestone
      )
    );
    setEditingMilestone(null);
    setEditedMilestoneName("");
  };

  return (
    <div className="tasks-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="tasks-title">Manage Milestones and Tasks</h1>

          {/* Add Milestone Section */}
          <div className="milestone-section">
            <input
              type="text"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              placeholder="Add a new milestone"
            />
            <button onClick={handleAddMilestone}>Add Milestone</button>
          </div>

          {/* Milestone List */}
          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="milestone-item">
                {editingMilestone === milestone.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedMilestoneName}
                      onChange={(e) => setEditedMilestoneName(e.target.value)}
                      placeholder="Edit milestone name"
                    />
                    <button className="save-button" onClick={() => handleSaveEditedMilestone(milestone.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2>{milestone.name}</h2>
                    <button className="edit-button" onClick={() => handleEditMilestone(milestone.id)}>
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMilestone(milestone.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Task Section Always Visible */}
                <div className="task-section">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="Task title"
                  />
                  <input
                    type="text"
                    value={newTask.creator}
                    onChange={(e) =>
                      setNewTask({ ...newTask, creator: e.target.value })
                    }
                    placeholder="Created by"
                  />
                  <button className="task-button" onClick={() => handleAddTask(milestone.id)}>
                    Add Task
                  </button>


                  <div className="tasks-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Task</th>
                          <th>Creator</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {milestone.tasks.map((task) => (
                          <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.creator}</td>
                            <td>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  handleDeleteTask(milestone.id, task.id)
                                }
                              >
                                Delete
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
