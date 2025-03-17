const express = require("express");
const connectDB = require("./config/dbs");
const cors = require('cors');

const userRoutes=require('./modules/User/UserRoutes')
const taskRoutes=require('./modules/Task/TaskRoutes')
const studentRoutes=require('./modules/Student/StudentRoutes')
const reminderRoutes=require('./modules/Reminder/ReminderRoutes');
const proposalRoutes=require('./modules/Proposal/ProposalRoutes');
const projectRoutes=require('./modules/Project/ProjectRoutes');
const milestoneRoutes=require('./modules/Milestone/MilestoneRoutes');
const meetingRoutes=require('./modules/Meeting/MeetingRoutes');
const groupRoutes=require('./modules/Group/GroupRoutes');
const feedbackRoutes=require('./modules/Feedback/FeedbackRoutes');
const facultyAdvisorRoutes=require('./modules/FacultyAdvisor/FacultyAdvisorRoutes');
const documentRoutes=require('./modules/Document/DocumentRoutes');
const deadlineRoutes=require('./modules/Deadline/DeadlineRoutes');
const adminRoutes=require('./modules/Admin/AdminRoutes');


const app = express();
app.use(cors());
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
