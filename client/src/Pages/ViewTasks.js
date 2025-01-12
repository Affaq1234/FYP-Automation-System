import React, { useState } from "react";
import "./ViewTasks.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewTasks = () => {
  const [milestones, setMilestones] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState({ title: "", creator: "" });

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, { id: Date.now(), name: newMilestone, tasks: [] }]);
      setNewMilestone("");
    }
  };

  const handleAddTask = () => {
    if (currentMilestone && newTask.title.trim() && newTask.creator.trim()) {
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) =>
          milestone.id === currentMilestone.id
            ? { ...milestone, tasks: [...milestone.tasks, { ...newTask, id: Date.now() }] }
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
          ? { ...milestone, tasks: milestone.tasks.filter((task) => task.id !== taskId) }
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
                <h2 onClick={() => setCurrentMilestone(milestone)}>
                  {milestone.name}
                </h2>

                {currentMilestone && currentMilestone.id === milestone.id && (
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
                    <button onClick={handleAddTask}>Add Task</button>

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
                )}
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
