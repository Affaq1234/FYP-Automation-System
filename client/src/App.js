
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import LoginPage from './Pages/loginPage';
import SignupPage from "./Pages/SignupPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import StudentDashboard from "./Pages/StudentDashboard";
import ManageDeadlines from "./Pages/ManageDeadlines";
import ViewTasks from "./Pages/ViewTasks";
import SubmitProposal from "./Pages/SubmitProposal";
import StartVideoConference from "./Pages/StartVideoConference";
import UploadDocumentation from "./Pages/UploadDocumentation";
import ViewFeedback from "./Pages/ViewFeedback";
import FYPRecommendations from "./Pages/FYPRecommendations";
import GroupManagement from "./Pages/GroupManagement";
import SupervisorDashboard from "./Pages/SupervisorDashboard";
import ProvideFeedback from "./Pages/ProvideFeedback";
import ScheduleMeeting from "./Pages/ScheduleMeeting";
import ApproveProposal from "./Pages/Approveproposal";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/deadlines" element={<ManageDeadlines />} />
        <Route path="/tasks" element={<ViewTasks />} />
        <Route path="/proposals" element={<SubmitProposal />} />
        <Route path="/video-conference" element={<StartVideoConference />} />
        <Route path="/upload-documentation" element={<UploadDocumentation />} />
        <Route path="/view-feedback" element={<ViewFeedback />} />
        <Route path="/fyp-recommendations" element={<FYPRecommendations />} />
        <Route path="/group-management" element={<GroupManagement />} />
        <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
        <Route path="/provide-feedback" element={<ProvideFeedback />} />
        <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        <Route path="/approve-proposal" element={<ApproveProposal />} />


        {/* Add routes for other pages like Login, About, Contact */}
      </Routes>
    </Router>
  );
};

export default App;
