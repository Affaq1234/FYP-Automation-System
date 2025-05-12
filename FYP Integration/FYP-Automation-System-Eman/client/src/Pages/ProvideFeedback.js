import React, { useState } from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import Footer from "../components/footer"; // Footer
import SupervisorSidebar from "../components/SupervisorSidebar"; // Sidebar for navigation
import "./ProvideFeedback.css"; // CSS for styling

const ProvideFeedback = () => {
  // State to hold feedback input
  const [feedback, setFeedback] = useState("");
  
  // State to track selected task for feedback
  const [selectedTask, setSelectedTask] = useState(null);

  // List of submitted tasks for evaluation
  const tasks = [
    { id: 1, title: "Project Proposal", student: "abc", description: "Proposal for AI-powered chatbot." },
    { id: 2, title: "Documentation Milestone 1", student: "xyz", description: "Initial project documentation." },
    { id: 3, title: "Final Report Draft", student: "Team 1", description: "Draft for the final report." },
  ];

  // Handles submission of feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log(`Feedback for task "${selectedTask.title}":`, feedback);
    
    // Clear input fields after submission
    setFeedback("");
    setSelectedTask(null);

    // Show confirmation message
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="feedback-container">
      <Navbar />

      <div className="dashboard-layout">
        <SupervisorSidebar />

        <main className="feedback-main">
          {/* Page Heading */}
          <h1>Provide Feedback</h1>

          {/* Task Selection Section */}
          <div className="task-section">
            <h2>Submitted Tasks</h2>
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${selectedTask?.id === task.id ? "selected" : ""}`} // Highlights selected task
                  onClick={() => setSelectedTask(task)}
                >
                  <h3>{task.title}</h3>
                  <p><strong>Student:</strong> {task.student}</p>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Form - Visible only when a task is selected */}
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
