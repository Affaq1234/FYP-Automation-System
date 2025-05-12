import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./PastEvaluation.css"; // Reusing the same CSS 

const PastEvaluations = () => {
    // Hardcoded Past Evaluations Data (Completed)
    const completedEvaluations = [
        { id: 1, name: "Group A", project: "AI-based Attendance System", score: "85%", feedback: "Good implementation", type: "Proposal" },
        { id: 2, name: "Group B", project: "Smart Library System", score: "78%", feedback: "Needs UI improvements", type: "FYP I" },
        { id: 3, name: "Group C", project: "Blockchain Voting System", score: "92%", feedback: "Excellent work!", type: "FYP II" },
        { id: 4, name: "Group D", project: "IoT-based Smart Agriculture", score: "80%", feedback: "Well-structured project", type: "Proposal" },
    ];

    // Hardcoded Pending Evaluations Data
    const pendingEvaluations = [
        { id: 5, name: "Group E", project: "Smart Traffic System", type: "Proposal" },
        { id: 6, name: "Group F", project: "AI Medical Diagnosis", type: "FYP I" },
        { id: 7, name: "Group G", project: "E-Commerce Chatbot", type: "FYP II" },
    ];

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-layout">
                <EvaluatorSideBar />

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="hero-section">
                        <h1>Past Evaluations</h1>
                        <p>Review the evaluations you have conducted.</p>
                    </div>

                    <div className="dashboard-content">
                        {/* Completed Evaluations Table */}
                        <div className="dashboard-section">
                            <h2>Completed Evaluations</h2>
                            <table className="groups-table">
                                <thead>
                                <tr>
                                    <th>Group Name</th>
                                    <th>Project Title</th>
                                    <th>Evaluation Type</th>
                                    <th>Score</th>
                                    <th>Feedback</th>
                                </tr>
                                </thead>
                                <tbody>
                                {completedEvaluations.map((evaluation) => (
                                    <tr key={evaluation.id}>
                                        <td>{evaluation.name}</td>
                                        <td>{evaluation.project}</td>
                                        <td>{evaluation.type}</td>
                                        <td>{evaluation.score}</td>
                                        <td>{evaluation.feedback}</td>
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

export default PastEvaluations;
