import React, { useEffect, useState } from "react";
import "./AdminDashboard.css"; 
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import AdminSidebar from "../components/AdminSideBar"; 
import axios from "axios";

// Admin Dashboard component
const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [newSupervisors, setNewSupervisors] = useState(0);
  const [newProjects, setNewProjects] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);

  // Mock recent activities data
  const [recentActivities, setRecentActivities] = useState([
    "User John Doe created a new project.",
    "Supervisor Jane Smith approved a report.",
    "User Mark updated their profile information.",
    "Supervisor Alex added a new task."
  ]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Data
        const userResponse = await axios.get("http://localhost:5000/api/user");
        setUserCount(userResponse.data.length);
        setNewUsers(userResponse.data.filter(user => new Date(user.createdAt) > new Date() - 7 * 24 * 60 * 60 * 1000).length); // Last 7 days

        // Fetch Supervisor Data (Faculty Advisors)
        const supervisorResponse = await axios.get("http://localhost:5000/api/facultyAdvisor");
        setSupervisorCount(supervisorResponse.data.length);
        setNewSupervisors(supervisorResponse.data.filter(supervisor => new Date(supervisor.createdAt) > new Date() - 1 * 24 * 60 * 60 * 1000).length); // Added today

        // Fetch Project Data
        const projectResponse = await axios.get("http://localhost:5000/api/project");
        setProjectCount(projectResponse.data.length);
        setNewProjects(projectResponse.data.filter(project => new Date(project.createdAt) > new Date() - 7 * 24 * 60 * 60 * 1000).length); // Last 7 days

        // Fetch Document Data (Reports)
        const reportResponse = await axios.get("http://localhost:5000/api/document");
        setReportCount(reportResponse.data.length);
        setPendingReports(reportResponse.data.filter(report => report.status === "pending").length); // Reports pending review
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

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
              <p>{userCount}</p>
              <small>{newUsers} new users this week</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-user-tie card-icon"></i> {/* Icon representing supervisors */}
              <h2>Supervisors</h2>
              <p>{supervisorCount}</p>
              <small>{newSupervisors} added today</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-project-diagram card-icon"></i> {/* Icon representing projects */}
              <h2>Projects</h2>
              <p>{projectCount}</p>
              <small>{newProjects} new projects started</small>
            </div>
            <div className="card advanced">
              <i className="fas fa-file-alt card-icon"></i> {/* Icon representing reports */}
              <h2>Reports</h2>
              <p>{reportCount}</p>
              <small>{pendingReports} reports pending review</small>
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="recent-activity">
            <h2>Recent Activities</h2>
            <ul>
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      <Footer /> {/* Calling Footer */}
    </div>
  );
};

export default AdminDashboard;
