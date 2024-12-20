const express = require("express");
const connectDB = require("./config/dbs");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT;
app.use(express.json()); 
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
