import React, { useState } from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import Footer from "../components/footer"; // Footer
import SupervisorSidebar from "../components/SupervisorSidebar"; // Sidebar
import "./ProvideFeedback.css"; // CSS for this page

const ProvideFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    { id: 1, title: "Project Proposal", student: "abc", description: "Proposal for AI-powered chatbot." },
    { id: 2, title: "Documentation Milestone 1", student: "xyz", description: "Initial project documentation." },
    { id: 3, title: "Final Report Draft", student: "Team 1", description: "Draft for the final report." },
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log(`Feedback for task "${selectedTask.title}":`, feedback);
    setFeedback("");
    setSelectedTask(null);
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="feedback-container">
      <Navbar />

      <div className="dashboard-layout">
        <SupervisorSidebar />

        <main className="feedback-main">
          <div className="hero-section">
            <h1>Provide Feedback</h1>
            <p>Review and provide feedback on student tasks and documents.</p>
          </div>

          <div className="task-section">
            <h2>Submitted Tasks</h2>
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${selectedTask?.id === task.id ? "selected" : ""}`}
                  onClick={() => setSelectedTask(task)}
                >
                  <h3>{task.title}</h3>
                  <p><strong>Student:</strong> {task.student}</p>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedTask && (
            <div className="feedback-form-section">
              <h2>Provide Feedback for: {selectedTask.title}</h2>
              <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                <textarea
                  placeholder="Write your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <button type="submit">Submit Feedback</button>
              </form>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProvideFeedback;
