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
  
    const handleBackup = () => {
      setBackupStatus('Backup in progress...');
      // Simulate system backup process
      setTimeout(() => {
        setBackupStatus('Backup completed successfully!');
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
          <button onClick={() => handleRestore}>Restore</button>
          {restoreStatus && <p>{restoreStatus}</p>}
        </div>

        <div className="card">
          <h3>System Reset</h3>
          <p>Remove all data from the database</p>
          <button onClick={handleReset}>Reset System</button>
          {resetStatus && <p>{resetStatus}</p>}
        </div>
      </div>
    </div>

      </div>
      <Footer />
    </div>
  );
};

export default BackupRestore;
