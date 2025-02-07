import React, { useState } from "react";
import "./ViewFeedback.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      date: "2025-01-05",
      project: "Project Management System",
      content: "Great progress on the project!",
      supervisor: "Dr. ABC",
      type: "Positive",
      rating: 4.5,
      status: "Resolved",
    },
    {
      id: 2,
      date: "2025-01-10",
      project: "Project Management System",
      content: "Need to improve documentation.",
      supervisor: "Dr. XYZ",
      type: "Constructive",
      rating: 3.0,
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-01-15",
      project: "Project Management System",
      content: "Consider adding more details to the presentation.",
      supervisor: "Dr. J",
      type: "Constructive",
      rating: 3.5,
      status: "In Progress",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredFeedback = feedbackList
    .filter((feedback) => {
      const matchesSearch = feedback.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || feedback.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const handleMarkAsResolved = (id) => {
    setFeedbackList((prevFeedback) =>
      prevFeedback.map((feedback) =>
        feedback.id === id ? { ...feedback, status: "Resolved" } : feedback
      )
    );
  };

  return (
    <div className="feedback-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="feedback-title">View Feedback</h1>

          {/* Search and Filters */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="positive">Positive</option>
              <option value="constructive">Constructive</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Feedback Table */}
          <div className="feedback-table">
            <h2>Feedback from Supervisors</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Feedback</th>
                  <th>Supervisor</th>
                  <th>Type</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.date}</td>
                    <td>{feedback.project}</td>
                    <td>{feedback.content}</td>
                    <td>{feedback.supervisor}</td>
                    <td>{feedback.type}</td>
                    <td>{feedback.rating}</td>
                    <td>
                      <span className={`status ${feedback.status.toLowerCase().replace(" ", "-")}`}>
                        {feedback.status}
                      </span>
                    </td>
                    <td>
                      {feedback.status !== "Resolved" && (
                        <button
                          className="resolve-button"
                          onClick={() => handleMarkAsResolved(feedback.id)}
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewFeedback;