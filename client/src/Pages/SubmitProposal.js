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
      fileName: formState.file ? formState.file.name : "No file uploaded",
      date: new Date().toLocaleDateString(),
      status: "Pending", // Initial status
    };
    setProposals([...proposals, newProposal]);
    setFormState({ title: "", description: "", file: null }); // Reset form
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
                    <strong>{proposal.title}</strong> - {proposal.description} (
                    {proposal.fileName}) [Submitted on {proposal.date}]
                    <span
                      className={`status ${
                        proposal.status.toLowerCase() // Add CSS class based on status
                      }`}
                    >
                      {proposal.status}
                    </span>
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
