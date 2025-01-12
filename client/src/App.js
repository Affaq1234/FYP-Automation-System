import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/SignupPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import StudentDashboard from "./Pages/StudentDashboard";
import ManageDeadlines from "./Pages/ManageDeadlines";
import ViewTasks from "./Pages/ViewTasks";
import SubmitProposal from "./Pages/SubmitProposal";
import AdminDashboard from "./Pages/AdminDashboard";
import BackupRestore from "./Pages/BackupAndRestore";
import UserAccount from "./Pages/manageUserAccounts";
import Reset from "./Pages/ResetSystem";
import SupervisorDashboad from "./Pages/SupervisorDashboad";
import SupervisorSearchPage from "./Pages/SearchDocument";
import Meeting from "./Pages/Meeting";
import GenerateReport from "./Pages/generateReports";


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
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/supervisor" element={<SupervisorDashboad />} />
        <Route path="/deadlines" element={<ManageDeadlines />} />
        <Route path="/tasks" element={<ViewTasks />} />
        <Route path="/proposals" element={<SubmitProposal />} />
        <Route path="/BackupAndRestore" element={<BackupRestore />} />
        <Route path="/manageUserAccounts" element={<UserAccount />} />
        <Route path="/ResetSystem" element={<Reset />} />
        <Route path="/SearchDocument" element={<SupervisorSearchPage />} />
        <Route path="/Meeting" element={<Meeting />} />
        <Route path="/generateReports" element={<GenerateReport />} />
        
        {/* Add routes for other pages like Login, About, Contact */}
      </Routes>
      
    </Router>
  );
};

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
