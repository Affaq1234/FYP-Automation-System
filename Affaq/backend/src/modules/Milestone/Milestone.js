const mongoose = require("mongoose");
const milestoneSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    }
},{ timestamps: true });
module.exports = mongoose.model("Milestone", milestoneSchema);