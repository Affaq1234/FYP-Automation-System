const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  milestoneId: {
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
  uploadedBy:{
    type: String,
    required:true
  }
});
module.exports = mongoose.model("Task", taskSchema);
