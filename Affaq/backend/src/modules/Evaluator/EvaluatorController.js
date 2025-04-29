const Evaluator = require('../Evaluator/Evaluator');

exports.createEvaluator = async (req, res) => {
  try {
    const { userId, Name } = req.body;
    const newEvaluator = new Evaluator({ userId, Name });
    const savedEvaluator = await newEvaluator.save();
    res.status(201).json(savedEvaluator);
  } catch (error) {
    res.status(500).json({ message: "Error creating evaluator", error });
  }
};

exports.getAllEvaluators = async (req, res) => {
  try {
    const evaluators = await Evaluator.find();
    res.status(200).json(evaluators);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving evaluators", error });
  }
};

exports.getEvaluatorById = async (req, res) => {
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

exports.updateEvaluator = async (req, res) => {
  try {
    const { userId, Name } = req.body;
    const updatedEvaluator = await Evaluator.findByIdAndUpdate(
      req.params.id,
      { userId, Name },
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

exports.deleteEvaluator = async (req, res) => {
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
