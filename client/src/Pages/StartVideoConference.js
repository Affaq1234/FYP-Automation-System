import React, { useState } from "react";
import "./StartVideoConference.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const StartVideoConference = () => {
  const [meetingLink, setMeetingLink] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleLinkChange = (e) => {
    setMeetingLink(e.target.value);
  };

  const sendMeetingLink = () => {
    if (!meetingLink) {
      alert("Please enter a valid meeting link!");
      return;
    }

    // Simulate sending email (backend will handle actual email logic)
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="video-conference-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="video-conference-title">Start Video Conference</h1>

          {/* Meeting Link Form */}
          <div className="meeting-link-section">
            <label htmlFor="meeting-link">Enter or Paste Meeting Link:</label>
            <input
              type="text"
              id="meeting-link"
              placeholder="https://meet.example.com/meeting-id"
              value={meetingLink}
              onChange={handleLinkChange}
            />
            <button onClick={sendMeetingLink}>Send Meeting Link</button>
          </div>

          {/* Success Message */}
          {emailSent && (
            <div className="success-message">
              Meeting link has been sent to all group members and advisors!
            </div>
          )}

          {/* Instructions Section */}
          <div className="instructions">
            <h2>Instructions</h2>
            <ul>
              <li>Paste the meeting link in the input box above.</li>
              <li>Click "Send Meeting Link" to notify group members and advisors.</li>
              <li>Ensure all participants check their emails for the link.</li>
              <li>Use the provided link to join the video conference.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartVideoConference;
