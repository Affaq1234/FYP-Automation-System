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
    const file = formData.get("file");

    // Ensure the file is a valid File object
    if (!(file instanceof File)) {
      alert("Please upload a valid file.");
      return;
    }

    const newDocument = {
      name: formData.get("documentName"),
      file: file, // Store the File object
      access: formData.get("access"),
      date: new Date().toLocaleDateString(),
    };
    setDocuments([...documents, newDocument]);
    event.target.reset(); // Clear the form
  };

  const handleDownload = (file, fileName) => {
    if (!file) {
      alert("File not found.");
      return;
    }

    // Create a URL for the file
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
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
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.name}</td>
                    <td>{doc.file.name}</td>
                    <td>{doc.access}</td>
                    <td>{doc.date}</td>
                    <td>
                      <button
                        className="download-button"
                        onClick={() => handleDownload(doc.file, doc.file.name)}
                      >
                        Download
                      </button>
                    </td>
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