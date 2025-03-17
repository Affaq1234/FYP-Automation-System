const mongoose = require("mongoose");
const reminderSchema = new mongoose.Schema({
  deadlineld: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentDate: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Reminder", reminderSchema);
