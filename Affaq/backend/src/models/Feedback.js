const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  facultyld: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
