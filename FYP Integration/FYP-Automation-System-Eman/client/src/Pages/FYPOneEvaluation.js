import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./EvaluationForm.css";

const FYPOneEvaluations = () => {
    const { groupId } = useParams(); // Get group ID from URL parameters

    // State to manage evaluation scores and feedback
    const [evaluation, setEvaluation] = useState({
        progress: "",
        codeQuality: "",
        communication: "",
        documentation: "",
        feedback: "",
    });

    // Handle input changes and update state
    const handleChange = (e) => {
        setEvaluation({ ...evaluation, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("FYP I Evaluation Submitted Successfully!");
    };

    return (
        <div className="evaluation-container">
            <Navbar />
            <div className="dashboard-layout">
                <EvaluatorSideBar />

                {/* Main evaluation section */}
                <main className="evaluation-content">
                    <h1>FYP I Evaluation - Group {groupId}</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Input for project progress */}
                        <label>Project Progress (Score out of 10):</label>
                        <input type="number" name="progress" max="10" min="0" onChange={handleChange} required />

                        {/* Input for code quality */}
                        <label>Code Quality (Score out of 10):</label>
                        <input type="number" name="codeQuality" max="10" min="0" onChange={handleChange} required />

                        {/* Input for presentation and communication skills */}
                        <label>Presentation & Communication (Score out of 10):</label>
                        <input type="number" name="communication" max="10" min="0" onChange={handleChange} required />

                        {/* Input for technical documentation */}
                        <label>Technical Documentation (Score out of 10):</label>
                        <input type="number" name="documentation" max="10" min="0" onChange={handleChange} required />

                        {/* Feedback text area */}
                        <label>Feedback:</label>
                        <textarea name="feedback" onChange={handleChange} required></textarea>

                        {/* Submit button */}
                        <button type="submit" className="submit-btn">Submit Evaluation</button>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default FYPOneEvaluations;
