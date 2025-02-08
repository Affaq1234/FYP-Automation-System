import React, { useState } from "react";
import "./CreateGroupPage.css"; // Include your styles
import Navbar from "../components/navbar"; // Your Navbar component
import Footer from "../components/footer"; // Your Footer component
import AdminSidebar from "../components/AdminSideBar";

function CreateGroupPage() {
  const [groupNumber, setGroupNumber] = useState(""); // Group number
  const [projectName, setProjectName] = useState(""); // Project name
  const [selectedMembers, setSelectedMembers] = useState([]); // Selected members for the group
  const [allGroups, setAllGroups] = useState([]); // List of all created groups

  // Mock data for students (replace with actual data from your backend)
  const [students] = useState([
    { id: 1, name: "Affaq", registrationNumber: "2021-CS-101" },
    { id: 2, name: "Asad", registrationNumber: "2021-CS-102" },
    { id: 3, name: "Eman", registrationNumber: "2021-CS-103" },
    { id: 4, name: "Ayesha", registrationNumber: "2021-CS-104" },
    { id: 5, name: "Ali", registrationNumber: "2021-CS-105" },
    { id: 6, name: "Sara", registrationNumber: "2021-CS-106" },
  ]);

  // Handle form submission to create a group
  const handleGroupCreation = (e) => {
    e.preventDefault();
    if (groupNumber.trim() && projectName.trim() && selectedMembers.length > 0) {
      const newGroup = {
        groupNumber,
        projectName,
        members: selectedMembers,
      };

      setAllGroups([...allGroups, newGroup]);

      // Reset inputs after group creation
      setGroupNumber("");
      setProjectName("");
      setSelectedMembers([]);
    } else {
      alert("Please fill in all fields and select at least one member.");
    }
  };

  // Handle selecting/deselecting a member
  const handleMemberSelection = (student) => {
    if (selectedMembers.includes(student)) {
      // Deselect the member
      setSelectedMembers(selectedMembers.filter((member) => member !== student));
    } else {
      // Select the member (max 4 members)
      if (selectedMembers.length < 4) {
        setSelectedMembers([...selectedMembers, student]);
      } else {
        alert("You can select up to 4 members per group.");
      }
    }
  };

  return (
    <div className="create-group-container">
      <Navbar />
      <div className="content-wrapper">
        {/* Admin Sidebar */}
        <div className="admin-sidebar">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="create-group-section">
            <div className="form-container">
              <h2>Create a New Group</h2>
              <form onSubmit={handleGroupCreation}>
                <div className="input-group">
                  <label htmlFor="group-number">Group Number</label>
                  <input
                    type="text"
                    id="group-number"
                    value={groupNumber}
                    onChange={(e) => setGroupNumber(e.target.value)}
                    placeholder="Enter group number"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="project-name">Project Name</label>
                  <input
                    type="text"
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="input-group">
                  <h3>Selected Members:</h3>
                  <ul className="members-list">
                    {selectedMembers.map((member, index) => (
                      <li key={index}>
                        {member.name} ({member.registrationNumber})
                      </li>
                    ))}
                  </ul>
                </div>

                <button type="submit" className="submit-button">
                  Create Group
                </button>
              </form>
            </div>

            {/* Student Selection Table */}
            <div className="student-selection">
              <h3>All Students</h3>
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Registration Number</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(student)}
                          onChange={() => handleMemberSelection(student)}
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.registrationNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Created Groups Table */}
            <div className="groups-list">
              <h3>Created Groups</h3>
              {allGroups.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Group Number</th>
                      <th>Project Name</th>
                      <th>Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGroups.map((group, index) => (
                      <tr key={index}>
                        <td>{group.groupNumber}</td>
                        <td>{group.projectName}</td>
                        <td>
                          <ul>
                            {group.members.map((member, memberIndex) => (
                              <li key={memberIndex}>
                                {member.name} ({member.registrationNumber})
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No groups have been created yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGroupPage;