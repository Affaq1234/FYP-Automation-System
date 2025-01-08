import React, { useState } from "react";
import "./ViewFeedback.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([
    { date: "2025-01-05", content: "Great progress on the project!", supervisor: "Dr. abc" },
    { date: "2025-01-10", content: "Need to improve documentation.", supervisor: "Dr. xyz" },
    { date: "2025-01-15", content: "Consider adding more details to the presentation.", supervisor: "Dr. j" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeedback = feedbackList.filter((feedback) =>
    feedback.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="feedback-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="feedback-title">View Feedback</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Feedback Table */}
          <div className="feedback-table">
            <h2>Feedback from Supervisors</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Feedback</th>
                  <th>Supervisor</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((feedback, index) => (
                  <tr key={index}>
                    <td>{feedback.date}</td>
                    <td>{feedback.content}</td>
                    <td>{feedback.supervisor}</td>
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
