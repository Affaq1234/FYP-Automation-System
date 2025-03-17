const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  agenda: {
    type: String,
    required: true,
    trim: true,
  },
  communicationHistory: {
    type: [],
    required: true,
  },
});
module.exports = mongoose.model("Meeting", meetingSchema);
