// Redesigned StudentDashboard Component with Sidebar and Improved Layout
//import React from "react";
import "./StudentDashboard.css"; // Corresponding CSS file for the theme
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import StudentSidebar from "../components/StudentSidebar";




const StudentDashboard = () => {


  const announcements = [
    { id: 1, text: "Mid-term evaluation results have been published." },
    { id: 2, text: "Next project milestone due: March 10th." },
    { id: 3, text: "Reminder: Group meeting scheduled for tomorrow." },
  ];


  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-layout">

      <StudentSidebar />
       
    

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="hero-section">
            <h1>Welcome, [Student Name]!</h1>
            <p>Track your progress and stay updated with the latest announcements.</p>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-section">
              <h2>Your Tasks</h2>
              <div className="card-grid">
                <div className="dashboard-card">
                  <i className="fas fa-tasks"></i>
                  <h3>Pending Tasks</h3>
                  <p>Complete documentation for the second milestone.</p>
                </div>
                <div className="dashboard-card">
                  <i className="fas fa-check-circle"></i>
                  <h3>Completed Tasks</h3>
                  <p>Proposal submission successfully reviewed.</p>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2>Announcements</h2>
              <ul className="announcement-list">
                {announcements.map((announcement) => (
                  <li key={announcement.id}>{announcement.text}</li>
                ))}
              </ul>
            </div>

            <div className="dashboard-section">
              <h2>Progress Overview</h2>
              <div className="progress-card">
                <h3>Milestone 1</h3>
                <p>Completion: 80%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div className="progress-card">
                <h3>Milestone 2</h3>
                <p>Completion: 40%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
