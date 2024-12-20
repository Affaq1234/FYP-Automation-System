const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  milestoneld: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  completionRate: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Task", taskSchema);
