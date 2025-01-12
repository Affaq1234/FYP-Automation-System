import React, { useState } from "react";
import Navbar from "../components/navbar"; // Top navigation bar
import Footer from "../components/footer"; // Footer
import StudentSidebar from "../components/StudentSidebar"; // Sidebar
import "./StartVideoConference.css"; // CSS for this page

const StartVideoConference = () => {
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  // Mock data for scheduled meetings (replace with real data later)
  const scheduledMeetings = [
    { id: 1, topic: "Team Alpha Discussion", date: "2025-01-15", time: "10:00 AM" },
    { id: 2, topic: "Project Review with Beta", date: "2025-01-16", time: "02:00 PM" },
    { id: 3, topic: "Final Presentation", date: "2025-01-20", time: "11:00 AM" },
  ];

  const handleGenerateLink = () => {
    if (!selectedMeeting) {
      alert("Please select a meeting first.");
      return;
    }
    // Mock meeting link generation
    const generatedLink = `https://meetings.example.com/${selectedMeeting.id}`;
    setMeetingLink(generatedLink);
  };

  return (
    <div className="feedback-container"> 
      <Navbar />

      <div className="dashboard-layout"> 
        <StudentSidebar />

        <main className="feedback-main"> 
          <h1>Start Video Conference</h1> 
          <div className="task-section"> 
            <h2>Select a Meeting</h2>
            <form className="feedback-form">
              <label htmlFor="meeting-select">Meeting:</label>
              <select
                id="meeting-select"
                value={selectedMeeting}
                onChange={(e) =>
                  setSelectedMeeting(scheduledMeetings.find((meeting) => meeting.id === parseInt(e.target.value)))
                }
              >
                <option value="">-- Select a Meeting --</option>
                {scheduledMeetings.map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>
                    {`${meeting.topic} on ${meeting.date} at ${meeting.time}`}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="feedback-form-section"> {/* Align link generation */}
            <h2>Generate Meeting Link</h2>
            <button
              className="generate-link-button"
              onClick={handleGenerateLink}
              disabled={!selectedMeeting}
            >
              Generate Meeting Link
            </button>

            {meetingLink && (
              <div className="generated-link">
                <p>
                  <strong>Meeting Link:</strong>{" "}
                  <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                    {meetingLink}
                  </a>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StartVideoConference;
