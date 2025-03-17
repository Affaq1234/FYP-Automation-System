const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    studentsID: {
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
    }
});

module.exports = mongoose.model("Group", groupSchema);