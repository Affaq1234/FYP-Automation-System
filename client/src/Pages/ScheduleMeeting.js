import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";
import "./ScheduleMeeting.css";

const ScheduleMeeting = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    topic: "",
  });
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const scheduleMeeting = (e) => {
    e.preventDefault();
    if (!meetingDetails.date || !meetingDetails.time || !meetingDetails.topic) {
      alert("Please fill out all fields.");
      return;
    }

    setScheduledMeetings([...scheduledMeetings, meetingDetails]);
    setMeetingDetails({ date: "", time: "", topic: "" });
    alert("Meeting scheduled successfully!");
  };

  return (
    <div className="schedule-meeting-container">
      <Navbar />

      <div className="content-wrapper">
        <SupervisorSidebar />

        <div className="main-content">
          <h1 className="schedule-meeting-title">Schedule a Meeting</h1>

          {/* Meeting Form */}
          <form onSubmit={scheduleMeeting} className="meeting-form">
            <div className="form-group">
              <label htmlFor="topic">Meeting Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={meetingDetails.topic}
                onChange={handleInputChange}
                placeholder="Enter meeting topic"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={meetingDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={meetingDetails.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="schedule-button">Schedule Meeting</button>
          </form>

          {/* Upcoming Meetings */}
          <div className="upcoming-meetings">
            <h2>Upcoming Meetings</h2>
            {scheduledMeetings.length === 0 ? (
              <p>No meetings scheduled yet.</p>
            ) : (
              <ul>
                {scheduledMeetings.map((meeting, index) => (
                  <li key={index}>
                    <p><strong>Topic:</strong> {meeting.topic}</p>
                    <p><strong>Date:</strong> {meeting.date}</p>
                    <p><strong>Time:</strong> {meeting.time}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleMeeting;
