const Log = require('../Log/Log');

const createLog = async (req, res) => {
  try {
    const { userId, action, message, createdAt } = req.body;
    const newLog = new Log({
      userId,
      action,
      message,
      createdAt
    });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: "Error creating log", error });
  }
};

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving logs", error });
  }
};

const getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving log", error });
  }
};

const deleteLog = async (req, res) => {
  try {
    const deleted = await Log.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting log", error });
  }
};

module.exports={createLog,deleteLog,getAllLogs,getLogById}