import React, { useState, useEffect } from "react";
import "./ViewTasks.css"; 
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import StudentSidebar from "../components/StudentSidebar"; 
import axios from "axios";

const ViewTasks = () => {
  const [milestones, setMilestones] = useState([]);
  const [tasks,setTasks]=useState([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    creator: "",
    status: "Pending",
    completedBy: "",
    createdAt: "",
    deadline: "",
  });
  const [studentData, setStudentData] = useState(null);
  const [groupData,setGroupData]=useState(null);
  const user = JSON.parse(localStorage.getItem("users"));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(
          `http://localhost:5000/api/student/user/${user.id}`
        );
        setStudentData(studentResponse.data);
        
        const groupResponse = await axios.post(
          `http://localhost:5000/api/group/student`,
          { regNo: studentResponse.data.regNo }
        );
        setGroupData(groupResponse.data);
        console.log(groupResponse.data);

        const milestoneResponse=await axios.get(`http://localhost:5000/api/milestone/group/${groupResponse.data.groupNo}`)
      setMilestones(milestoneResponse.data);
      console.log(milestoneResponse.data)

        const taskResponse=await axios.get(`http://localhost:5000/api/task/group/${groupResponse.data.groupNo}`);
      setTasks(taskResponse.data);
      console.log(taskResponse.data)
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };
  
    fetchData();
  }, [user.id]); 

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
    setNewTask({
      title: "",
      creator: "",
      status: "Pending",
      completedBy: "",
      createdAt: "",
      deadline: "",
    });
  };

  const handleUpdateTaskStatus = (milestoneId, taskId, newStatus, studentName) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      status: newStatus,
                      completedBy: studentName,
                      completedAt: new Date().toLocaleString(),
                    }
                  : task
              ),
            }
          : milestone
      )
    );
  };

  // Show loading message while fetching student data
  if (studentData === null) {
    return <p>Loading...</p>;
  }

  if (!studentData.isGrouped) {
    return <p>Student is not a part of any Group yet.</p>;
  }
  return (
    <div className="tasks-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="tasks-title">Manage Milestones and Tasks</h1>

          {/* Milestone input */}
          <div className="milestone-section">
            <input
              type="text"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              placeholder="Add a new milestone"
            />
            <button onClick={handleAddMilestone}>Add Milestone</button>
          </div>

          {/* List of milestones */}
          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="milestone-item">
                <h2>{milestone.name}</h2>
                <p>Created on: {milestone.createdAt}</p>

                {/* Task input */}
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
                  <button className="task-button" onClick={() => handleAddTask(milestone.id)}>
                    Add Task
                  </button>

                  {/* Task table */}
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
                              <button
                                className="mark-completed-button"
                                onClick={() =>
                                  handleUpdateTaskStatus(
                                    milestone.id,
                                    task.id,
                                    "Completed",
                                    studentData.name || "Student X"
                                  )
                                }
                              >
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