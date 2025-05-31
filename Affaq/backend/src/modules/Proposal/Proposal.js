const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
    groupNo: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    }
    ,
    supervisorID: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
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
        required:true
    },
    evaluatorId:{
        type:String,
        required:true
    }
},{ timestamps: true });

module.exports = mongoose.model("Proposal", proposalSchema);