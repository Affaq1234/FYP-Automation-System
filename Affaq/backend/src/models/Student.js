const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});
module.exports = mongoose.model("Student", studentSchema);
