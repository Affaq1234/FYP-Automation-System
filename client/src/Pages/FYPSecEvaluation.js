import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EvaluatorSideBar from "../components/EvaluatorSideBar";
import "./EvaluationForm.css"; // Reusing styles

const FYPSecEvaluations = () => {
    const { groupId } = useParams();

    // State for evaluation form inputs
    const [evaluation, setEvaluation] = useState({
        functionality: "",
        innovation: "",
        implementation: "",
        documentation: "",
        feedback: "",
    });

    // Handling input change
    const handleChange = (e) => {
        setEvaluation({ ...evaluation, [e.target.name]: e.target.value });
    };

    // Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Ensure all fields are filled
        if (
            !evaluation.functionality ||
            !evaluation.innovation ||
            !evaluation.implementation ||
            !evaluation.documentation ||
            !evaluation.feedback
        ) {
            alert("Please fill all fields before submitting.");
            return;
        }

        alert("FYP II Evaluation Submitted Successfully!");
        // Here, we can implement API call to save evaluation in the database
    };

    return (
        <div className="evaluation-container">
            <Navbar />
            <div className="dashboard-layout">
                <EvaluatorSideBar />
                <main className="evaluation-content">
                    <h1>FYP II Final Evaluation - Group {groupId}</h1>

                    <form onSubmit={handleSubmit}>
                        <label>Functionality (Score out of 10):</label>
                        <input
                            type="number"
                            name="functionality"
                            max="10"
                            min="0"
                            value={evaluation.functionality}
                            onChange={handleChange}
                            required
                        />

                        <label>Innovation & Impact (Score out of 10):</label>
                        <input
                            type="number"
                            name="innovation"
                            max="10"
                            min="0"
                            value={evaluation.innovation}
                            onChange={handleChange}
                            required
                        />

                        <label>Technical Implementation (Score out of 10):</label>
                        <input
                            type="number"
                            name="implementation"
                            max="10"
                            min="0"
                            value={evaluation.implementation}
                            onChange={handleChange}
                            required
                        />

                        <label>Final Documentation (Score out of 10):</label>
                        <input
                            type="number"
                            name="documentation"
                            max="10"
                            min="0"
                            value={evaluation.documentation}
                            onChange={handleChange}
                            required
                        />

                        <label>Overall Feedback:</label>
                        <textarea
                            name="feedback"
                            value={evaluation.feedback}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit" className="submit-btn">Submit Evaluation</button>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default FYPSecEvaluations;
