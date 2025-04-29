const Evaluation = require('../Evaluation/Evaluation');

exports.createEvaluation = async (req, res) => {
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

exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluations", error });
  }
};

exports.getEvaluationById = async (req, res) => {
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

exports.updateEvaluation = async (req, res) => {
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

exports.deleteEvaluation = async (req, res) => {
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
