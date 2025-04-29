const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true
  },
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
  isGrouped:{
    type:Boolean,
    required: true,
  },
},{ timestamps: true });
module.exports = mongoose.model("Student", studentSchema);
