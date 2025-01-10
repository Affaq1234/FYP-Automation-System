import React, { useState } from "react";
import "./ApproveProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";

const ApproveProposal = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Automated Attendance System",
      description: "A project to automate attendance using facial recognition.",
      fileName: "AttendanceSystem.pdf",
      date: "01/09/2025",
      status: "Pending",
    },
    {
      id: 2,
      title: "E-Learning Platform",
      description: "An interactive platform for online learning.",
      fileName: "ELearningPlatform.docx",
      date: "05/09/2025",
      status: "Pending",
    },
  ]);

  const handleAction = (id, action) => {
    setProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.id === id ? { ...proposal, status: action } : proposal
      )
    );
  };

  return (
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <SupervisorSidebar />
        <div className="main-content">
          <h1 className="proposal-title">Approve Proposals</h1>

          <div className="proposal-list">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="proposal-item">
                <h3>{proposal.title}</h3>
                <p>{proposal.description}</p>
                <p>
                  <strong>File:</strong> {proposal.fileName} |{" "}
                  <strong>Submitted on:</strong> {proposal.date}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${proposal.status.toLowerCase()}`}>
                    {proposal.status}
                  </span>
                </p>
                <div className="actions">
                  {proposal.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(proposal.id, "Approved")}
                        className="approve-button"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(proposal.id, "Rejected")}
                        className="reject-button"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApproveProposal;
