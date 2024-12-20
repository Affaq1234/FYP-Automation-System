const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required:true
    },
    attachmentName:{
        type:String,
        required:true
    },
    attachment:{
        type:Buffer,
        required:true,
    }
});
module.exports = mongoose.model("Document", documentSchema);