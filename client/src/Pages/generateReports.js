import React, { useState } from 'react';
import './generateReport.css';
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";

function GenerateReport() {
  // State variables to store report details
  const [reports, setReports] = useState([]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  // Handles report submission and adds it to the list
  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (reportTitle && reportContent && reportDate) {
      const newReport = {
        title: reportTitle,
        content: reportContent,
        date: reportDate,
      };

      setReports([...reports, newReport]); // Adds new report to the existing list
      setReportTitle('');
      setReportContent('');
      setReportDate('');
      setIsReportGenerated(true); // Displays generated reports section
    } else {
      alert('Please fill all fields!'); // Ensures all fields are filled before submission
    }
  };

  return (
    <div className="proposal-container">
      <Navbar /><br /><br /><br />
      <div className="content-wrapper">
        <SupervisorSidebar />
        
        <div className="App">
          <h1>Generate Supervisor Reports</h1>

          {/* Form to input report details */}
          <form onSubmit={handleGenerateReport} className="report-form">
            <div className="form-group">
              <label htmlFor="reportTitle">Report Title:</label>
              <input
                type="text"
                id="reportTitle"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reportContent">Report Content:</label>
              <textarea
                id="reportContent"
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reportDate">Date:</label>
              <input
                type="date"
                id="reportDate"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="generate-btn">Generate Report</button>
          </form>

          {/* Displays generated reports after submission */}
          {isReportGenerated && <h2>Generated Reports</h2>}

          <div className="report-list">
            {reports.map((report, index) => (
              <div key={index} className="report-card">
                <h3>{report.title}</h3>
                <p><strong>Date:</strong> {report.date}</p>
                <p><strong>Content:</strong> {report.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GenerateReport;
