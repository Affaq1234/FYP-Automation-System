import React, { useState } from 'react';
import './Meeting.css';

import Modal from 'react-modal';

// Set the root element for the modal (important for accessibility)
Modal.setAppElement('#root');

function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supervisor, setSupervisor] = useState('');
  const [student, setStudent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [admin, setAdmin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeeting = { supervisor, student, date, time, admin };
    setMeetings([...meetings, newMeeting]);
    setSupervisor('');
    setStudent('');
    setDate('');
    setTime('');
    setAdmin('');
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Meeting Scheduler</h1>

      <button onClick={() => setIsModalOpen(true)} className="add-meeting-btn">
        Schedule a New Meeting
      </button>

      <div className="meeting-grid">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-card">
            <h3>Meeting Details</h3>
            <p><strong>Supervisor:</strong> {meeting.supervisor}</p>
            <p><strong>Student:</strong> {meeting.student}</p>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Time:</strong> {meeting.time}</p>
            <p><strong>Admin:</strong> {meeting.admin}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="overlay">
        <h2>Schedule a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <label>Supervisor</label>
          <input
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            required
          />

          <label>Student</label>
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>Admin</label>
          <input
            type="text"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            required
          />

          <button type="submit">Save Meeting</button>
        </form>
      </Modal>
    </div>
  );
}

export default Meeting;
