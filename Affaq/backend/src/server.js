const express = require("express");
const connectDB = require("./config/dbs");
const userRoutes=require('./routes/UserRoutes')
const taskRoutes=require('./routes/TaskRoutes')

const app = express();
const PORT = 5000;
app.use(express.json()); 
connectDB();

app.use('/api/users',userRoutes);
app.use('/api/task',taskRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
