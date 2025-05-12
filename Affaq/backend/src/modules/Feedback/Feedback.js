const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
  },
  groupId: {
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
  type:{
    type:String,
    enum:["document","milestone"],
    required:true
  },
  documentId:{
    type:String
  },
  milestoneId:{
    type:String
  }
},{ timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
