import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./AdminNotification.css";
import AdminSidebar from "../components/AdminSideBar";

// Done. Completed front end and backend
const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fetch all notifications from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notification")
      .then((res) => {
        setNotifications(res.data.reverse()); // show latest first
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
      });
  }, []);

  // ✅ Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notification/${id}`, {
        isRead: true,
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
      alert("Failed to mark notification as read.");
    }
  };

  // ✅ Delete notification from backend and frontend
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notification/${id}`);
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
      alert("Failed to delete notification.");
    }
  };

  // ✅ Add new notification (immediate or scheduled)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNotification.trim() && scheduledDate && scheduledTime) {
      setIsSubmitting(true);
      setSuccessMessage("");

      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const currentDateTime = new Date();

      const sendNotification = () => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const newNotificationObj = {
          message: newNotification,
          date,
          time,
          isRead: false,
        };

        axios
          .post("http://localhost:5000/api/notification", newNotificationObj)
          .then((res) => {
            setNotifications((prev) => [res.data, ...prev]);
            setNewNotification("");
            setScheduledDate("");
            setScheduledTime("");
            setIsSubmitting(false);
            setSuccessMessage("Notification has been sent successfully!");
            alert(`Notification sent successfully on ${date} at ${time}`);
          })
          .catch((err) => {
            console.error("Failed to send notification:", err);
            setIsSubmitting(false);
            alert("Failed to send notification.");
          });
      };

      if (scheduledDateTime > currentDateTime) {
        const delay = scheduledDateTime - currentDateTime;
        setTimeout(sendNotification, delay);
      } else {
        sendNotification();
      }
    } else {
      alert("Please provide a message, date, and time for the notification.");
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
                <button
                  type="submit"
                  className="btn submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Notification"}
                </button>
              </div>
            </form>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>

          <div className="notifications-list">
            <h2>Recent Notifications</h2>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`notification-item ${
                      notification.isRead ? "read" : "unread"
                    }`}
                  >
                    <div>
                      <p className="notification-message">
                        {notification.message}
                      </p>
                      <p className="notification-date">
                        {`${notification.date} at ${notification.time}`}
                      </p>
                    </div>
                    <div className="notification-actions">
                      {!notification.isRead && (
                        <button
                          className="btn mark-as-read"
                          onClick={() => markAsRead(notification._id)}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        className="btn delete"
                        onClick={() => deleteNotification(notification._id)}
                      >
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
