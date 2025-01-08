import React, { useState } from "react";
import "./UploadDocumentation.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentSidebar from "../components/StudentSidebar";

const UploadDocumentation = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newDocument = {
      name: formData.get("documentName"),
      file: formData.get("file").name,
      access: formData.get("access"),
      date: new Date().toLocaleDateString(),
    };
    setDocuments([...documents, newDocument]);
    event.target.reset(); // Clear the form
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="upload-doc-container">
      <Navbar />
      <div className="content-wrapper">
        <StudentSidebar />
        <div className="main-content">
          <h1 className="upload-doc-title">Upload Documentation</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Upload Form */}
          <form onSubmit={handleUpload} className="upload-form">
            <input
              type="text"
              name="documentName"
              placeholder="Enter document name"
              required
            />
            <input type="file" name="file" required />
            <select name="access" required>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <button type="submit">Upload Document</button>
          </form>

          {/* Document Table */}
          <div className="documents-table">
            <h2>Document Repository</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>File</th>
                  <th>Access</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.name}</td>
                    <td>{doc.file}</td>
                    <td>{doc.access}</td>
                    <td>{doc.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadDocumentation;
