import React, { useState } from 'react';
import './generateReport.css';
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSideBar";

function GenerateReport() {
  const [reports, setReports] = useState([]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (reportTitle && reportContent && reportDate) {
      const newReport = {
        title: reportTitle,
        content: reportContent,
        date: reportDate,
      };

      setReports([...reports, newReport]);
      setReportTitle('');
      setReportContent('');
      setReportDate('');
      setIsReportGenerated(true);
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <div className="proposal-container">
      <Navbar /><br /><br /><br />
      <div className="content-wrapper">
        <SupervisorSidebar />
        
        <div className="App">
      <h1>Generate Supervisor Reports</h1>

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
