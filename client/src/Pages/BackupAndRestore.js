import React, { useState } from "react";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AdminSidebar from "../components/AdminSideBar";
import "./BackupRestore.css";

const BackupRestore = () => {
  const [backupStatus, setBackupStatus] = useState('');
  const [restoreStatus, setRestoreStatus] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleBackup = () => {
    setBackupStatus('Backup in progress...');
    // Simulate system backup process
    setTimeout(() => {
      setBackupStatus('Backup completed successfully!');
    }, 2000);
  };
  const handleDownloadBackup = () => {
    setDownloadStatus("Preparing backup for download...");
    setTimeout(() => {
      setDownloadStatus("Download ready!");
      // Simulating file download
      const link = document.createElement("a");
      link.href = "path/to/backup-file.zip"; // Replace with actual backup file path
      link.download = "backup-file.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  const handleRestore = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRestoreStatus(`Restoring from ${file.name}...`);
      // Simulate restore process
      setTimeout(() => {
        setRestoreStatus('Restore completed successfully!');
      }, 2000);
    } else {
      setRestoreStatus('No file selected.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the system? This will remove all data.')) {
      setResetStatus('System reset in progress...');
      // Simulate reset process
      setTimeout(() => {
        setResetStatus('System reset completed successfully!');
      }, 2000);
    }
  };

  return (
    <div className="proposal-container">
      <Navbar /><br /><br /><br />
      <div className="content-wrapper">
        <AdminSidebar />
        
        <div className="backup-page">

          {/* Page Heading */}
          <div className="heading">
            <h1>Backup and Restore System</h1>
            <p>Manage system backups, restore from files, or reset the database.</p>
          </div>

          {/* Main content */}
          <div className="container">
            <div className="card">
              <h3>System Backup</h3>
              <p>Create a backup of the entire database</p>
              <button onClick={handleBackup}>Create Backup</button>
              {backupStatus && <p>{backupStatus}</p>}
            </div>

            <div className="card">
              <h3>System Restore</h3>
              <p>Restore data from a backup file</p>
              <input type="file" onChange={handleRestore} />
              <button>Restore</button>
              {restoreStatus && <p>{restoreStatus}</p>}
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
              <button onClick={handleDownloadBackup}>Download Backup</button>
              {downloadStatus && <p>{downloadStatus}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BackupRestore;
