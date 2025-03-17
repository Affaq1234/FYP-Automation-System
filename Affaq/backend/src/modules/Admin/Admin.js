const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [],
    required: true,
  }
});
module.exports = mongoose.model("Admin", AdminSchema);