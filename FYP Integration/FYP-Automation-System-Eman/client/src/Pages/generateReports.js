import React, { useState } from 'react';
import './generateReport.css';
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";

function GenerateReport() {
  const [reports, setReports] = useState([]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Sample groups with tasks & milestones
  const [groups] = useState([
    {
      id: 1,
      name: "Group 1 - AI Project",
      tasks: [
        { name: "Literature Review", completed: true },
        { name: "Dataset Collection", completed: true },
        { name: "Model Training", completed: false },
      ],
      milestones: [
        { name: "Proposal Submission", completed: true },
        { name: "Mid Evaluation", completed: false },
      ],
    },
    {
      id: 2,
      name: "Group 2 - Web App",
      tasks: [
        { name: "UI Design", completed: true },
        { name: "Frontend Dev", completed: false },
      ],
      milestones: [
        { name: "Proposal Approval", completed: true },
        { name: "Demo Day", completed: false },
      ],
    },
  ]);

  const selectedGroupData = groups.find(group => group.name === selectedGroup);

  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (reportTitle && reportContent && reportDate && selectedGroup) {
      const newReport = {
        title: reportTitle,
        content: reportContent,
        date: reportDate,
        group: selectedGroup,
      };

      setReports([...reports, newReport]);
      setReportTitle('');
      setReportContent('');
      setReportDate('');
      setIsReportGenerated(true);
    } else {
      alert('Please fill all fields and select a group!');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
      <div className="proposal-container">
        <Navbar /><br /><br /><br />
        <div className="content-wrapper">
          <SupervisorSidebar />

          <div className="App">
            <h1>Generate Supervisor Reports</h1>

            {/* Group Selection */}
            <div className="form-group">
              <label>Select Student Group:</label>
              <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  required
              >
                <option value="">-- Select Group --</option>
                {groups.map((group) => (
                    <option key={group.id} value={group.name}>
                      {group.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Modal Trigger */}
            {selectedGroup && (
                <button className="view-group-btn" onClick={openModal}>
                  View Tasks & Milestones
                </button>
            )}

            {/* Modal Popup */}
            {showModal && selectedGroupData && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3>{selectedGroupData.name} Overview</h3>
                    <p><strong>Total Tasks:</strong> {selectedGroupData.tasks.length}</p>
                    <p><strong>Completed Tasks:</strong> {selectedGroupData.tasks.filter(t => t.completed).length}</p>
                    <p><strong>Total Milestones:</strong> {selectedGroupData.milestones.length}</p>
                    <p><strong>Completed
                      Milestones:</strong> {selectedGroupData.milestones.filter(m => m.completed).length}</p>

                    <button className="close-btn" onClick={closeModal}>Close</button>
                  </div>
                </div>
            )}

            {/* Report Form */}
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

            {/* Reports Section */}
            {isReportGenerated && <h2>Reports for Selected Group</h2>}

            <div className="report-list">
              {reports
                  .filter((report) => report.group === selectedGroup)
                  .map((report, index) => (
                      <div key={index} className="report-card">
                        <h3>{report.title}</h3>
                        <p><strong>Group:</strong> {report.group}</p>
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
