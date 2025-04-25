const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required:true
    },
    isRead:{
        type:Boolean,
    }
});

module.exports = mongoose.model("Notification",notificationSchema);