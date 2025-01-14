import React, { useState } from "react";
import "./SubmitProposal.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./AdminNotification.css"; // Add your styles here
import AdminSidebar from "../components/AdminSideBar";

const AdminNotificationsPage = () => {
  // Mock data for notifications
  const initialNotifications = [
    { id: 1, message: "New student registration pending approval", date: "2024-01-15", time: "10:30 AM", isRead: false },
    { id: 2, message: "Supervisor has updated the project details", date: "2024-01-14", time: "02:45 PM", isRead: true },
    { id: 3, message: "System update scheduled for tomorrow", date: "2024-01-13", time: "11:00 AM", isRead: false },
    { id: 4, message: "New document submission from Supervisor", date: "2024-01-12", time: "09:15 AM", isRead: true },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map((notification) => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Handle new notification submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNotification.trim() !== "" && scheduledDate && scheduledTime) {
      setIsSubmitting(true);
      setSuccessMessage(''); // Reset any success message on new submission

      // Create the full scheduled time by combining date and time
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const currentDateTime = new Date();

      if (scheduledDateTime > currentDateTime) {
        const timeDifference = scheduledDateTime - currentDateTime; // Calculate difference in milliseconds

        setTimeout(() => {
          // Notification sent after scheduled time
          const currentDate = new Date();
          const date = currentDate.toLocaleDateString();
          const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const newNotificationObj = {
            id: notifications.length + 1,
            message: newNotification,
            date: date,
            time: time,
            isRead: false,
          };

          setNotifications([newNotificationObj, ...notifications]);
          setNewNotification('');
          setScheduledDate('');
          setScheduledTime('');
          setIsSubmitting(false);
          setSuccessMessage('Notification has been sent successfully!'); // Success message after notification is sent

          // Show an alert with the details of the notification
          alert(`Notification sent successfully on ${date} at ${time}`);
        }, timeDifference); // Send the notification after the scheduled time
      } else {
        // Immediately send the notification if scheduled time is in the past
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newNotificationObj = {
          id: notifications.length + 1,
          message: newNotification,
          date: date,
          time: time,
          isRead: false,
        };

        setNotifications([newNotificationObj, ...notifications]);
        setNewNotification('');
        setScheduledDate('');
        setScheduledTime('');
        setIsSubmitting(false);
        setSuccessMessage('Notification has been sent successfully!'); // Success message after notification is sent

        // Show an alert with the details of the notification
        alert(`Notification sent successfully on ${date} at ${time}`);
      }
    } else {
      alert("Please provide a message, date, and time for the notification.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="proposal-container">
      <Navbar />
      <div className="content-wrapper">
        <AdminSidebar />
        <div className="admin-notifications-container">
      <header className="header">
        <h1>Admin Notifications</h1>
        <p>View, manage, and send notifications to students and supervisors</p>
      </header>

      {/* Form to submit a new notification */}
      <div className="notification-form-container">
        <h2>Create New Notification</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            placeholder="Write your notification here..."
            rows="4"
            required
          />
          <div className="form-actions">
            <label>
              Schedule Date:
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </label>
            <label>
              Schedule Time:
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Notification"}
            </button>
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        <h2>Recent Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className={`notification-item ${notification.isRead ? "read" : "unread"}`}>
                <div>
                  <p className="notification-message">{notification.message}</p>
                  <p className="notification-date">{`${notification.date} at ${notification.time}`}</p>
                </div>
                <div className="notification-actions">
                  {!notification.isRead && (
                    <button className="btn mark-as-read" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </button>
                  )}
                  <button className="btn delete" onClick={() => deleteNotification(notification.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>

      </div>
      <Footer />
    </div>
  );
};

export default AdminNotificationsPage;
