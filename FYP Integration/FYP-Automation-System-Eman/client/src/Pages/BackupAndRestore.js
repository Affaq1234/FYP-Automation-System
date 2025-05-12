import React, { useState } from "react";
import axios from "axios";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AdminSidebar from "../components/AdminSideBar";
import "./BackupRestore.css";

const BackupRestore = () => {
  const [resetStatus, setResetStatus] = useState('');

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset the system? This will remove all data.')) {
      setResetStatus('System reset in progress...');
      try {
        const response = await axios.post('http://localhost:5000/api/admin/clear-all');
        if (response.status === 200) {
          setResetStatus('System reset completed successfully! All data has been removed from the database.');
        } else {
          setResetStatus('Failed to reset the system. Please try again.');
        }
      } catch (error) {
        console.error("System reset error:", error);
        setResetStatus('An error occurred while resetting the system.');
      }
    }
  };

  return (
    <div className="proposal-container">
      <Navbar /><br /><br /><br />
      <div className="content-wrapper">
        <AdminSidebar />

        <div className="backup-page">
          <div className="heading">
            <h1>Backup and Restore System</h1>
            <p>Manage system backups, restore from files, or reset the database.</p>
          </div>

          <div className="container">
            <div className="card">
              <h3>System Restore</h3>
              <p>Restore data from a backup file</p>
              <input type="file" />
              <button>Restore</button>
            </div>

            <div className="card">
              <h3>System Reset</h3>
              <p>Remove all data from the database</p>
              <button onClick={handleReset}>Reset System</button>
              {resetStatus && <p>{resetStatus}</p>}
            </div>

            <div className="card">
              <h3>Download Backup</h3>
              <p>Download the latest backup file</p>
              <button>Download Backup</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BackupRestore;
