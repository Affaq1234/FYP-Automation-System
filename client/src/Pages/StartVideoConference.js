import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./StartVideoConference.css";
import StudentSidebar from "../components/StudentSidebar";

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
    <div className="video-conference-container">
      <Navbar />

      <div className="content-wrapper">
        <StudentSidebar />

        <div className="main-content">
          <h1 className="video-conference-title">Start Video Conference</h1>

          {/* Meeting Selection */}
          <div className="meeting-selection">
            <label htmlFor="meeting-select">Select a Meeting:</label>
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
          </div>

          {/* Generate Meeting Link */}
          <div className="generate-link-section">
            <button
              className="generate-link-button"
              onClick={handleGenerateLink}
              disabled={!selectedMeeting}
            >
              Generate Meeting Link
            </button>

            {meetingLink && (
              <div className="generated-link">
                <p><strong>Meeting Link:</strong> <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StartVideoConference;
