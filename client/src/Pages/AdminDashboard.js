// Import required dependencies and components
import React from "react";
import "./AdminDashboard.css"; 
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import AdminSidebar from "../components/AdminSideBar"; 

// Admin Dashboard component
const AdminDashboard = () => {
  
  // Sample announcements displayed on the dashboard
  const announcements = [
    { id: 1, text: "Mid-term evaluation results have been published." },
    { id: 2, text: "Next project milestone due: March 10th." },
    { id: 3, text: "Reminder: Group meeting scheduled for tomorrow." },
  ];

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Calling navigation bar */}
      <div className="dashboard-layout">
        <AdminSidebar /> {/* Sidebar with admin options */}

        {/* Main Content Section */}
        <main className="main-content">
          {/* Dashboard Header */}
          <header>
            <h1>Welcome, Admin!</h1>
            <p>Here's an overview of the system.</p>
          </header>

          {/* Statistics Cards Section */}
          <div className="cards">
            <div className="card advanced">
              <i className="fas fa-users card-icon"></i> {/* Icon representing users */}
              <h2>Active Users</h2>
              <p>250</p>
              <small>15 new users this week</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-user-tie card-icon"></i> {/* Icon representing supervisors */}
              <h2>Supervisors</h2>
              <p>35</p>
              <small>2 added today</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-project-diagram card-icon"></i> {/* Icon representing projects */}
              <h2>Projects</h2>
              <p>120</p>
              <small>10 new projects started</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-file-alt card-icon"></i> {/* Icon representing reports */}
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

      <Footer /> {/* Calling Footer */}
    </div>
  );
};

export default AdminDashboard;
