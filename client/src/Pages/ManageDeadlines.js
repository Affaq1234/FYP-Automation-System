import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ManageDeadlines.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ManageDeadlines = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deadlines, setDeadlines] = useState([]);

  const addDeadline = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newDeadline = {
      date: selectedDate.toDateString(),
      task: formData.get("task"),
    };
    setDeadlines([...deadlines, newDeadline]);
    event.target.reset(); // Clear the form
  };

  return (
    <div className="deadlines-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="deadlines-title">View and Manage Deadlines</h1>

          {/* Calendar Section */}
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="deadline-calendar"
            />
            <p>Selected Date: {selectedDate.toDateString()}</p>
          </div>

          {/* Form Section */}
          <form onSubmit={addDeadline} className="deadline-form">
            <input
              type="text"
              name="task"
              placeholder="Enter task description"
              required
            />
            <button type="submit">Add Deadline</button>
          </form>

          {/* Table Section */}
          <div className="deadlines-table">
            <h2>Upcoming Deadlines</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((deadline, index) => (
                  <tr key={index}>
                    <td>{deadline.date}</td>
                    <td>{deadline.task}</td>
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

export default ManageDeadlines;
