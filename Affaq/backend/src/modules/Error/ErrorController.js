const ErrorModel = require('../Error/Error');

exports.createError = async (req, res) => {
  try {
    const { errorCode, errorMessage, userId, createdAt } = req.body;
    const newError = new ErrorModel({
      errorCode,
      errorMessage,
      userId,
      createdAt
    });
    const savedError = await newError.save();
    res.status(201).json(savedError);
  } catch (error) {
    res.status(500).json({ message: "Error creating error log", error });
  }
};

exports.getAllErrors = async (req, res) => {
  try {
    const errors = await ErrorModel.find();
    res.status(200).json(errors);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving errors", error });
  }
};

exports.getErrorById = async (req, res) => {
  try {
    const error = await ErrorModel.findById(req.params.id);
    if (!error) {
      return res.status(404).json({ message: "Error log not found" });
    }
    res.status(200).json(error);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving error log", error });
  }
};

exports.deleteError = async (req, res) => {
  try {
    const deleted = await ErrorModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Error log not found" });
    }
    res.status(200).json({ message: "Error log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting error log", error });
  }
};
