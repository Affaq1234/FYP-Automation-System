const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
    groupID: {
        type: String,
        required: true
    },
    supervisorID: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required:true
    },
    attachmentName:{
        type:String,
        required:true
    },
    attachment:{
        type:Buffer,
        require:true
    }
});

module.exports = mongoose.model("Proposal", proposalSchema);