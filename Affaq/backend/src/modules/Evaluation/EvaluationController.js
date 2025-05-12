const Evaluation = require('../Evaluation/Evaluation');

const createEvaluation = async (req, res) => {
  try {
    const {
      evaluatorId,
      groupId,
      evaluationType,
      status,
      totalScore,
      obtainedScore,
      feedback
    } = req.body;

    const newEvaluation = new Evaluation({
      evaluatorId,
      groupId,
      evaluationType,
      status,
      totalScore,
      obtainedScore,
      feedback
    });

    const savedEvaluation = await newEvaluation.save();
    res.status(201).json(savedEvaluation);
  } catch (error) {
    res.status(500).json({ message: "Error creating evaluation", error });
  }
};

const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluations", error });
  }
};

const getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluation", error });
  }
};

const updateEvaluation = async (req, res) => {
  try {
    const {
      evaluatorId,
      groupId,
      evaluationType,
      status,
      totalScore,
      obtainedScore,
      feedback
    } = req.body;

    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      {
        evaluatorId,
        groupId,
        evaluationType,
        status,
        totalScore,
        obtainedScore,
        feedback
      },
      { new: true }
    );

    if (!updatedEvaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.status(200).json(updatedEvaluation);
  } catch (error) {
    res.status(500).json({ message: "Error updating evaluation", error });
  }
};

const deleteEvaluation = async (req, res) => {
  try {
    const deleted = await Evaluation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Evaluation not found" });
    }
    res.status(200).json({ message: "Evaluation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting evaluation", error });
  }
};
const getEvaluationsByGroupId = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ groupId: req.params.groupId });
    
    if (evaluations.length === 0) {
      return res.status(404).json({ message: "No evaluations found for this group ID" });
    }
    
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getEvaluationsByEvaluatorId = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ evaluatorId: req.params.evaluatorId });
    
    if (evaluations.length === 0) {
      return res.status(404).json({ message: "No evaluations found for this evaluator ID" });
    }
    
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports={createEvaluation,deleteEvaluation,updateEvaluation,getAllEvaluations,getEvaluationById,getEvaluationsByEvaluatorId,getEvaluationsByGroupId}