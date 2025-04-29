const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupNo:{
        type:String,
        required:true
    },
    studentsRegno: {
        type: [],
        required: true
    },
    projectID: {
        type: String,
        required: true
    },
    supervisorID:{
        type: String,
        required:true
    },
    evaluatorID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Group", groupSchema);