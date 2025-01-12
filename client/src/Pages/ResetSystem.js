import React, { useState } from "react";
import "./ResetSystem.css";
import AdminSidebar from "../components/AdminSideBar";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ResetSystem() {
  const [showModal, setShowModal] = useState(false);
  const [resetType, setResetType] = useState("");

  const handleReset = (type) => {
    setResetType(type);
    setShowModal(true);
  };

  const confirmReset = () => {
    alert(`The ${resetType} has been reset successfully!`);
    setShowModal(false);
  };


  return (
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="App">
      <header>
        <h1>System Reset</h1>
        <p>Advanced Reset Options for System Management</p>
      </header>

      <main>
        {/* Reset Options */}
        <div className="reset-cards">
          <div className="reset-card">
            <h3>Reset Password</h3>
            <p>Reset the user or admin passwords to defaults.</p>
            <button onClick={() => handleReset("Password")}>Reset</button>
          </div>

          <div className="reset-card">
            <h3>Reset Preferences</h3>
            <p>Restore all user preferences to default settings.</p>
            <button onClick={() => handleReset("Preferences")}>Reset</button>
          </div>

          <div className="reset-card">
            <h3>Reset Configuration</h3>
            <p>Revert system configuration to factory settings.</p>
            <button onClick={() => handleReset("Configuration")}>Reset</button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Reset</h2>
            <p>
              Are you sure you want to reset <strong>{resetType}</strong>? This
              action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmReset}>
                Yes, Reset
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>

      </div>
      <Footer />
    </div>
  );
};

export default ResetSystem;

