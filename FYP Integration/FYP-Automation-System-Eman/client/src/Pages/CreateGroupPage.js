import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateGroupPage.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AdminSidebar from "../components/AdminSideBar";

function CreateGroupPage() {
  const [groupNumber, setGroupNumber] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [supervisor, setSupervisor] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentsRes,
          supervisorsRes,
          evaluatorsRes,
          projectsRes,
          groupsRes,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/student"),
          axios.get("http://localhost:5000/api/facultyAdvisor"),
          axios.get("http://localhost:5000/api/evaluator"),
          axios.get("http://localhost:5000/api/project"),
          axios.get("http://localhost:5000/api/group"),
        ]);

        const allStudents = studentsRes.data;
        const currentGroups = groupsRes.data;

        const enrichedGroups = await Promise.all(
          currentGroups.map(async (group) => ({
            ...group,
            projectTitle: projectsRes.data.find(
              (p) => p._id === group.projectID
            )?.title,
            supervisorName: supervisorsRes.data.find(
              (s) => s.userId === group.supervisorID
            )?.Name,
            evaluatorName: evaluatorsRes.data.find(
              (e) => e.userId === group.evaluatorID
            )?.name,
            members: allStudents.filter((s) =>
              group.studentsRegno.includes(s.regNo)
            ),
          }))
        );

        setStudents(allStudents.filter((s) => !s.isGrouped));
        setSupervisors(supervisorsRes.data);
        setEvaluators(evaluatorsRes.data);
        setAllGroups(enrichedGroups);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGroupCreation = async (e) => {
    e.preventDefault();

    if (
      !groupNumber ||
      !projectName ||
      selectedMembers.length === 0 ||
      !supervisor ||
      !evaluator
    ) {
      alert("Please fill all fields and select members, supervisor, and evaluator.");
      return;
    }

    try {
      // Create project
      const projectRes = await axios.post("http://localhost:5000/api/project", {
        title: projectName,
        status: "Active",
      });

      // Create group
      const groupRes = await axios.post("http://localhost:5000/api/group", {
        groupNo: groupNumber,
        studentsRegno: selectedMembers.map((m) => m.regNo),
        projectID: projectRes.data._id,
        supervisorID: supervisor,
        evaluatorID: evaluator,
      });

      // Update students' status using _id
      await Promise.all(
        selectedMembers.map((member) =>
          axios.patch(`http://localhost:5000/api/student/${member._id}`, {
            isGrouped: true
          })
        )
      );

      // Update state
      const newGroup = {
        ...groupRes.data,
        projectTitle: projectName,
        supervisorName: supervisors.find((s) => s.userId === supervisor)?.Name,
        evaluatorName: evaluators.find((e) => e.userId === evaluator)?.name,
        members: selectedMembers,
      };

      setAllGroups((prev) => [...prev, newGroup]);
      setStudents((prev) =>
        prev.filter((s) => !selectedMembers.some((m) => m._id === s._id))
      );
      resetForm();
    } catch (error) {
      console.error("Group creation error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create group. Please try again."
      );
    }
  };

  const handleDisbandGroup = async (groupId, projectId, members) => {
    if (!window.confirm("Are you sure you want to disband this group?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/group/${groupId}`);
      await axios.delete(`http://localhost:5000/api/project/${projectId}`);

      // Reset student statuses using _id
      await Promise.all(
        members.map((member) =>
          axios.patch(`http://localhost:5000/api/student/${member._id}`, {
            isGrouped: false
          })
        )
      );

      // Update state
      setAllGroups((prev) => prev.filter((g) => g._id !== groupId));
      setStudents((prev) => [
        ...prev,
        ...members.map((m) => ({ ...m, isGrouped: false })),
      ]);
    } catch (error) {
      console.error("Disband error:", error);
      alert("Failed to disband group. Please try again.");
    }
  };

  const handleMemberSelection = (student) => {
    const isSelected = selectedMembers.some((m) => m._id === student._id);
    if (isSelected) {
      setSelectedMembers((prev) =>
        prev.filter((m) => m._id !== student._id)
      );
    } else if (selectedMembers.length < 4) {
      setSelectedMembers((prev) => [...prev, student]);
    } else {
      alert("Maximum 4 members per group!");
    }
  };

  const resetForm = () => {
    setGroupNumber("");
    setProjectName("");
    setSelectedMembers([]);
    setSupervisor("");
    setEvaluator("");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="create-group-container">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="main-content">
          <div className="create-group-section">
            {/* Group Creation Form */}
            <div className="form-container">
              <h2>Create New Group</h2>
              <form onSubmit={handleGroupCreation}>
                <div className="input-group">
                  <label>Group Number</label>
                  <input
                    type="text"
                    value={groupNumber}
                    onChange={(e) => setGroupNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Supervisor</label>
                  <select
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    required
                  >
                    <option value="">Select Supervisor</option>
                    {supervisors.map((s) => (
                      <option key={s.userId} value={s.userId}>
                        {s.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Evaluator</label>
                  <select
                    value={evaluator}
                    onChange={(e) => setEvaluator(e.target.value)}
                    required
                  >
                    <option value="">Select Evaluator</option>
                    {evaluators.map((e) => (
                      <option key={e.userId} value={e.userId}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-button">
                  Create Group
                </button>
              </form>
            </div>

            {/* Student Selection */}
            <div className="student-selection">
              <h3>Available Students</h3>
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
                    <tr key={student._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedMembers.some(
                            (m) => m._id === student._id
                          )}
                          onChange={() => handleMemberSelection(student)}
                        />
                      </td>
                      <td>{student.studentName}</td>
                      <td>{student.regNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Existing Groups */}
            <div className="groups-list">
              <h3>Existing Groups</h3>
              {allGroups.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Group No</th>
                      <th>Project</th>
                      <th>Supervisor</th>
                      <th>Evaluator</th>
                      <th>Members</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGroups.map((group) => (
                      <tr key={group._id}>
                        <td>{group.groupNo}</td>
                        <td>{group.projectTitle}</td>
                        <td>{group.supervisorName}</td>
                        <td>{group.evaluatorName}</td>
                        <td>
                          <ul>
                            {group.members.map((member) => (
                              <li key={member._id}>
                                {member.studentName} ({member.regNo})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <button
                            className="disband-button"
                            onClick={() =>
                              handleDisbandGroup(
                                group._id,
                                group.projectID,
                                group.members
                              )
                            }
                          >
                            Disband
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No groups found</p>
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