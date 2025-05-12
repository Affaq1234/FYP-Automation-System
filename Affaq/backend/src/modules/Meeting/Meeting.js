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
  groupId:{
    type:String,
    required:true
  },
  agenda: {
    type: String,
    required: true,
    trim: true,
  }
},{ timestamps: true });
module.exports = mongoose.model("Meeting", meetingSchema);
