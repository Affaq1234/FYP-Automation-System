const Evaluator = require('../Evaluator/Evaluator');

const createEvaluator = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const newEvaluator = new Evaluator({ userId, name });
    const savedEvaluator = await newEvaluator.save();
    res.status(201).json(savedEvaluator);
  } catch (error) {
    res.status(500).json({ message: "Error creating evaluator", error });
  }
};

const getAllEvaluators = async (req, res) => {
  try {
    const evaluators = await Evaluator.find();
    res.status(200).json(evaluators);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluators", error });
  }
};

const getEvaluatorById = async (req, res) => {
  try {
    const evaluator = await Evaluator.findById(req.params.id);
    if (!evaluator) {
      return res.status(404).json({ message: "Evaluator not found" });
    }
    res.status(200).json(evaluator);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluator", error });
  }
};

const updateEvaluator = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const updatedEvaluator = await Evaluator.findByIdAndUpdate(
      req.params.id,
      { userId, name },
      { new: true }
    );
    if (!updatedEvaluator) {
      return res.status(404).json({ message: "Evaluator not found" });
    }
    res.status(200).json(updatedEvaluator);
  } catch (error) {
    res.status(500).json({ message: "Error updating evaluator", error });
  }
};

const deleteEvaluator = async (req, res) => {
  try {
    const deleted = await Evaluator.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Evaluator not found" });
    }
    res.status(200).json({ message: "Evaluator deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting evaluator", error });
  }
};

module.exports={createEvaluator,deleteEvaluator,updateEvaluator,getAllEvaluators,getEvaluatorById}