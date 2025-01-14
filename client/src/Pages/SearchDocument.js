import React from 'react';
import './SearchDocument.css';
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";

const SupervisorSearchPage = () => {
  return (
    <div className="proposal-container1">
      <Navbar />
      <div className="content-wrapper1">
        <SupervisorSidebar />
        <div className="container">
      

      <div className="action-buttons">
        <button className="btn primary">Add Document</button>
        <button className="btn secondary">View All Documents</button>
        <button className="btn tertiary">Generate Summary Report</button>
      </div>

      <div className="card-container">
        <div className="card">
          <h3>Total Documents</h3>
          <p>150</p>
        </div>
        <div className="card">
          <h3>Under Review</h3>
          <p>20</p>
        </div>
        <div className="card">
          <h3>Approved</h3>
          <p>110</p>
        </div>
        <div className="card">
          <h3>Rejected</h3>
          <p>20</p>
        </div>
      </div>

      <section className="search-section">
        <h2>Search Documents</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, keywords, or tags"
            className="search-input"
          />
          <button className="btn search">Search</button>
        </div>
        <div className="filters">
          <select className="filter">
            <option value="">Filter by Type</option>
            <option value="report">Report</option>
            <option value="thesis">Thesis</option>
            <option value="proposal">Proposal</option>
          </select>
          <select className="filter">
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="date"
            className="filter"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="filter"
            placeholder="End Date"
          />
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          <li>
            Document "Machine Learning Trends" was approved on 2024-01-15.
          </li>
          <li>
            Proposal "Blockchain Security" is pending review by Dr. Jane Smith.
          </li>
          <li>
            Report "Data Privacy Insights" was rejected on 2024-01-10.
          </li>
        </ul>
      </section>
    </div>



      </div>
      <Footer />
    </div>
  );
};

export default SupervisorSearchPage;