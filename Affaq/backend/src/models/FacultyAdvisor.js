const mongoose = require("mongoose");
const facultyAdvisorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Meetings: {
        type:[]
    }
});
module.exports = mongoose.model("FacultyAdvisor", facultyAdvisorSchema);