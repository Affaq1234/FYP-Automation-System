import React, { useState } from "react";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const SubmitProposal = () => {
  const [proposals, setProposals] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState({
      ...formState,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProposal = {
      id: proposals.length + 1,
      title: formState.title,
      description: formState.description,
      file: formState.file, // Store the file object
      fileName: formState.file ? formState.file.name : "No file uploaded",
      date: new Date().toLocaleDateString(),
      status: "Pending", // Initial status
    };
    setProposals([...proposals, newProposal]);
    setFormState({ title: "", description: "", file: null }); // Reset form
  };

  const handleDownload = (file, fileName) => {
    if (!file) {
      alert("File not found.");
      return;
    }

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const updateProposalStatus = (id, status) => {
    setProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.id === id ? { ...proposal, status } : proposal
      )
    );
  };

  return (
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="proposal-title">Submit Your Proposal</h1>

          {/* Proposal Form */}
          <form className="proposal-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Proposal Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              required
              placeholder="Enter proposal title"
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
              placeholder="Provide a brief description"
            ></textarea>

            <label htmlFor="file">Upload Proposal Document:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
            />

            <button type="submit">Submit Proposal</button>
          </form>

          {/* Submitted Proposals List */}
          <div className="submitted-proposals">
            <h2>Previously Submitted Proposals</h2>
            {proposals.length > 0 ? (
              <ul>
                {proposals.map((proposal) => (
                  <li key={proposal.id}>
                    <div className="proposal-details">
                      <div className="proposal-header">
                        <strong>{proposal.title}</strong>
                        <span
                          className={`status ${proposal.status.toLowerCase()}`}
                        >
                          {proposal.status}
                        </span>
                      </div>
                      <p>{proposal.description}</p>
                      <div className="proposal-meta">
                        <span>File: {proposal.fileName}</span>
                        <span>Submitted on: {proposal.date}</span>
                      </div>
                      {proposal.file && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(proposal.file, proposal.fileName)}
                        >
                          Download File
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No proposals submitted yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitProposal;