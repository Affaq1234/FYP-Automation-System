import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./ProjectEvaluation.css";

const EvaluateProjects = () => {
    const navigate = useNavigate(); // Enables navigation between pages

    // Hardcoded Assigned Groups Data (Each group is assigned a project)
    const assignedGroups = [
        { id: 1, name: "Group A", project: "AI-based Attendance System" },
        { id: 2, name: "Group B", project: "Smart Library System" },
        { id: 3, name: "Group C", project: "Blockchain Voting System" },
        { id: 4, name: "Group D", project: "IoT-based Smart Agriculture" },
    ];

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-layout">
                <EvaluatorSideBar />
                <main className="dashboard-main">
                    <div className="hero-section">
                        <h1>Evaluate Projects</h1>
                        <p>Select a group and an evaluation phase.</p>
                    </div>

                    {/* Section to Display Assigned Groups and Evaluation Options */}
                    <div className="dashboard-content">
                        <div className="dashboard-section">
                            <h2>Your Assigned Groups</h2>
                            <table className="groups-table">
                                <thead>
                                <tr>
                                    <th>Group Name</th>
                                    <th>Project Title</th>
                                    <th>Evaluation Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {assignedGroups.map((group) => (
                                    <tr key={group.id}>
                                        <td>{group.name}</td>
                                        <td>{group.project}</td>
                                        <td>
                                            {/* Navigation buttons to evaluate different project phases */}
                                            <button 
                                                onClick={() => navigate(`/ProposalEvaluation/${group.id}`)} 
                                                className="evaluate-btn"
                                            >
                                                Evaluate Proposal
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/FYPOneEvaluation/${group.id}`)} 
                                                className="evaluate-btn"
                                            >
                                                Evaluate FYP I
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/FYPSecEvaluation/${group.id}`)} 
                                                className="evaluate-btn"
                                            >
                                                Evaluate FYP II
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default EvaluateProjects;
