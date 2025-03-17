const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required:true
    },
    status:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("Project", projectSchema);