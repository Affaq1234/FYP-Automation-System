import React, { useState } from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import Footer from "../components/footer"; // Footer
import SupervisorSidebar from "../components/SupervisorSidebar"; // Sidebar
import "./ScheduleMeeting.css"; // CSS for this page

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
    <div className="feedback-container">
       <Navbar />
      <div className="dashboard-layout"> 
        <SupervisorSidebar />

        <main className="feedback-main"> 
          <h1>Schedule a Meeting</h1> 

          <div className="task-section"> 
            <h2>Meeting Details</h2>
            <form onSubmit={scheduleMeeting} className="feedback-form">
              <textarea
                placeholder="Enter meeting topic"
                name="topic"
                value={meetingDetails.topic}
                onChange={handleInputChange}
                required
              />
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
              <button type="submit">Schedule Meeting</button>
            </form>
          </div>

          <div className="feedback-form-section"> 
            <h2>Upcoming Meetings</h2>
            {scheduledMeetings.length === 0 ? (
              <p>No meetings scheduled yet.</p>
            ) : (
              <ul>
                {scheduledMeetings.map((meeting, index) => (
                  <li key={index} className="task-card"> 
                    <h3>{meeting.topic}</h3>
                    <p><strong>Date:</strong> {meeting.date}</p>
                    <p><strong>Time:</strong> {meeting.time}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleMeeting;
