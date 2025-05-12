import React, { useState } from 'react';
import './SearchDocument.css';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SupervisorSidebar from "../components/SupervisorSidebar";

const SearchDocumentPage = () => {
  const [documents] = useState([
    { title: "Machine Learning Trends", status: "approved", type: "report", date: "2024-01-15", groupNumber: "01", downloadLink: "/documents/ml-trends.pdf" },
    { title: "Blockchain Security", status: "pending", type: "proposal", date: "2024-01-10", groupNumber: "02", downloadLink: "/documents/blockchain-security.pdf" },
    { title: "Data Privacy Insights", status: "rejected", type: "report", date: "2024-01-05", groupNumber: "01", downloadLink: "/documents/data-privacy.pdf" },
    { title: "AI Ethics", status: "approved", type: "thesis", date: "2024-01-18", groupNumber: "03", downloadLink: "/documents/ai-ethics.pdf" },
  ]);

  const [groupNumberInput, setGroupNumberInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [documentSearchTerm, setDocumentSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStage, setSearchStage] = useState('group'); // 'group', 'document', 'results'

  const handleGroupNumberSubmit = () => {
    if (groupNumberInput.trim()) {
      setSelectedGroup(groupNumberInput.trim());
      setSearchStage('document');
      setSearchResults(documents.filter(doc => doc.groupNumber === groupNumberInput.trim()));
    } else {
      alert("Please enter a valid group number.");
    }
  };

  const handleDocumentSearch = () => {
    const results = documents.filter(
        (doc) =>
            doc.groupNumber === selectedGroup &&
            doc.title.toLowerCase().includes(documentSearchTerm.toLowerCase())
    );
    setSearchResults(results);
    setSearchStage('results');
  };

  const resetSearch = () => {
    setSelectedGroup('');
    setDocumentSearchTerm('');
    setSearchResults([]);
    setSearchStage('group');
    setGroupNumberInput('');
  };

  const goBackToDocumentSearch = () => {
    setDocumentSearchTerm('');
    setSearchStage('document');
    setSearchResults(documents.filter(doc => doc.groupNumber === selectedGroup));
  };

  return (
      <div className="search-document-container">
        <Navbar />
        <div className="content-wrapper">
          <SupervisorSidebar />

          <div className="search-container">
            <h2>Search Documents</h2>

            {searchStage === 'group' && (
                <div className="group-input-section">
                  <h3>Enter Group Number</h3>
                  <input
                      type="text"
                      value={groupNumberInput}
                      placeholder="e.g., 01"
                      onChange={(e) => setGroupNumberInput(e.target.value)}
                      className="group-number-input"
                  />
                  <button className="btn" onClick={handleGroupNumberSubmit}>
                    Next
                  </button>
                </div>
            )}

            {searchStage === 'document' && selectedGroup && (
                <div className="document-search-section">
                  <h3>Search Document for Group {selectedGroup}</h3>
                  <input
                      type="text"
                      placeholder="Enter document title to search"
                      className="search-input"
                      value={documentSearchTerm}
                      onChange={(e) => setDocumentSearchTerm(e.target.value)}
                  />
                  <div className="search-actions">
                    <button className="btn" onClick={handleDocumentSearch}>
                      Search
                    </button>
                    <button className="btn secondary-btn" onClick={resetSearch}>
                      Change Group
                    </button>
                  </div>
                </div>
            )}

            {searchStage === 'results' && selectedGroup && (
                <div className="results-container">
                  <h3>Search Results for Group {selectedGroup}</h3>
                  {searchResults.length > 0 ? (
                      <ul className="document-list">
                        {searchResults.map((doc, index) => (
                            <li key={index} className="document-card">
                              <div className="document-title">{doc.title}</div>
                              <div className="document-meta">
                                <span>{doc.type} - {doc.status}</span>
                                <span>Date: {doc.date}</span>
                              </div>
                              <a
                                  href={doc.downloadLink}
                                  download
                                  className="btn download-btn"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                Download
                              </a>
                            </li>
                        ))}
                      </ul>
                  ) : (
                      <p>No documents found for group {selectedGroup} matching your search.</p>
                  )}
                  <div className="search-actions">
                    <button className="btn secondary-btn" onClick={goBackToDocumentSearch}>
                      Back to Search
                    </button>
                    <button className="btn secondary-btn" onClick={resetSearch}>
                      Change Group
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default SearchDocumentPage;