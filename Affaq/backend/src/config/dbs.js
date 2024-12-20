const mongoose = require("mongoose");
const dbURI = "mongodb+srv://Affaq:affaq1940351@fyp-automation-system.5uoeq.mongodb.net/?retryWrites=true&w=majority&appName=FYP-Automation-System";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;