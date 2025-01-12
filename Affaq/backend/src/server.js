const express = require("express");
const connectDB = require("./config/dbs");
const cors = require('cors');

app.use(cors());


const userRoutes=require('./routes/UserRoutes')
const taskRoutes=require('./routes/TaskRoutes')
const studentRoutes=require('./routes/StudentRoutes')
const reminderRoutes=require('./routes/ReminderRoutes');
const proposalRoutes=require('./routes/ProposalRoutes');
const projectRoutes=require('./routes/ProjectRoutes');
const milestoneRoutes=require('./routes/MilestoneRoutes');
const meetingRoutes=require('./routes/MeetingRoutes');
const groupRoutes=require('./routes/GroupRoutes');
const feedbackRoutes=require('./routes/FeedbackRoutes');
const facultyAdvisorRoutes=require('./routes/FacultyAdvisorRoutes');
const documentRoutes=require('./routes/DocumentRoutes');
const deadlineRoutes=require('./routes/DeadlineRoutes');
const adminRoutes=require('./routes/AdminRoutes');


const app = express();
const PORT = 5000;
app.use(express.json()); 
connectDB();


app.use('/api/user',userRoutes);
app.use('/api/task',taskRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/reminder',reminderRoutes);
app.use('/api/proposal',proposalRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/milestone',milestoneRoutes);
app.use('/api/meeting',meetingRoutes);
app.use('/api/group',groupRoutes);
app.use('/api/feedback',feedbackRoutes);
app.use('/api/facultyAdvisor',facultyAdvisorRoutes);
app.use('/api/document',documentRoutes);
app.use('/api/deadline',deadlineRoutes);
app.use('/api/admin',adminRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
