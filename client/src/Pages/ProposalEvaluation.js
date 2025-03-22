import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./EvaluationForm.css"; // Reuse styles

const ProposalEvaluations = () => {
    const { groupId } = useParams(); // Get the group ID from the URL parameters

    // State to store evaluation form inputs
    const [evaluation, setEvaluation] = useState({
        originality: "",
        feasibility: "",
        documentation: "",
        feedback: "",
    });

    // Handles input changes and updates the state
    const handleChange = (e) => {
        setEvaluation({ ...evaluation, [e.target.name]: e.target.value });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Proposal Evaluation Submitted Successfully!");
    };

    return (
        <div className="evaluation-container">
            <Navbar />
            <div className="dashboard-layout">
                <EvaluatorSideBar />
                <main className="evaluation-content">
                    <h1>Proposal Evaluation - Group {groupId}</h1>
                    <form onSubmit={handleSubmit}>
                        
                        {/* Originality Score */}
                        <label>Originality (Score out of 10):</label>
                        <input 
                            type="number" 
                            name="originality" 
                            max="10" 
                            min="0" 
                            onChange={handleChange} 
                            required 
                        />

                        {/* Feasibility Score */}
                        <label>Feasibility (Score out of 10):</label>
                        <input 
                            type="number" 
                            name="feasibility" 
                            max="10" 
                            min="0" 
                            onChange={handleChange} 
                            required 
                        />

                        {/* Documentation Score */}
                        <label>Documentation (Score out of 10):</label>
                        <input 
                            type="number" 
                            name="documentation" 
                            max="10" 
                            min="0" 
                            onChange={handleChange} 
                            required 
                        />

                        {/* Feedback Section */}
                        <label>Feedback:</label>
                        <textarea 
                            name="feedback" 
                            onChange={handleChange} 
                            required
                        ></textarea>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn">
                            Submit Evaluation
                        </button>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ProposalEvaluations;
