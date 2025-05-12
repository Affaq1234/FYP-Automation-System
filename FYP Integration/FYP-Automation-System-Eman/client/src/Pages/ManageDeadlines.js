import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ManageDeadlines.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const ManageDeadlines = () => {
  // State to manage selected date from calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to store list of deadlines
  const [deadlines, setDeadlines] = useState([]);

  // Function to add a new deadline
  const addDeadline = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newDeadline = {
      date: selectedDate.toDateString(),
      task: formData.get("task"),
    };
    setDeadlines([...deadlines, newDeadline]); // Update the deadline list
    event.target.reset(); // Clear the input field
  };

  return (
    <div className="deadlines-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="deadlines-title">View and Manage Deadlines</h1>

          {/* Calendar Section - Select a date */}
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="deadline-calendar"
            />
            <p>Selected Date: {selectedDate.toDateString()}</p>
          </div>

          {/* Form Section - Add new deadline */}
          <form onSubmit={addDeadline} className="deadline-form">
            <input
              type="text"
              name="task"
              placeholder="Enter task description"
              required
            />
            <button type="submit">Add Deadline</button>
          </form>

          {/* Table Section - Display list of deadlines */}
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
