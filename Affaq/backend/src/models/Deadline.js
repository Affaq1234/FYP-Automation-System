const mongoose = require("mongoose");
const deadlineSchema = new mongoose.Schema({
  projectld: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    trim: true,
  },
  reminders: {
    type: [],
    required: true,
  },
});
module.exports = mongoose.model("Deadline", deadlineSchema);
