const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
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