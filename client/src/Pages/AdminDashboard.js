// Redesigned StudentDashboard Component with Sidebar and Improved Layout
//import React from "react";
import "./AdminDashboard.css"; // Corresponding CSS file for the theme
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import AdminSidebar from "../components/AdminSideBar";
import { FaUsers, FaUserTie, FaProjectDiagram, FaFileAlt } from "react-icons/fa";





const AdminDashboard = () => {


  const announcements = [
    { id: 1, text: "Mid-term evaluation results have been published." },
    { id: 2, text: "Next project milestone due: March 10th." },
    { id: 3, text: "Reminder: Group meeting scheduled for tomorrow." },
  ];


  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-layout">

      <AdminSidebar />
       
    

        {/* Main Content */}
        <main className="main-content">
        <header>
          <h1>Welcome, Admin!</h1>
          <p>Here's an overview of the system.</p>
        </header>

        {/* Cards Section */}
        <div className="cards">
          <div className="card advanced">
            <FaUsers className="card-icon" />
            <h2>Active Users</h2>
            <p>250</p>
            <small>15 new users this week</small>
          </div>
          <div className="card advanced">
            <FaUserTie className="card-icon" />
            <h2>Supervisors</h2>
            <p>35</p>
            <small>2 added today</small>
          </div>
          <div className="card advanced">
            <FaProjectDiagram className="card-icon" />
            <h2>Projects</h2>
            <p>120</p>
            <small>10 new projects started</small>
          </div>
          <div className="card advanced">
            <FaFileAlt className="card-icon" />
            <h2>Reports</h2>
            <p>45</p>
            <small>5 reports pending review</small>
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="recent-activity">
          <h2>Recent Activities</h2>
          <ul>
            <li>User John Doe created a new project.</li>
            <li>Supervisor Jane Smith approved a report.</li>
            <li>User Mark updated their profile information.</li>
            <li>Supervisor Alex added a new task.</li>
          </ul>
        </section>
      </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
