const Notification=require('./Notification');
const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllNotifications = async (req, res) => {
    try {
        const Notifications = await Notification.find();
        res.status(200).json(Notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteNotification = async (req, res) => {
    try {
      const { id } = req.params;
      await Notification.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateNotification = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedNotification);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneNotification = async (req, res) => {
    try {
      const { id } = req.params; 
      const notification = await Notification.findById(id); 
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json(notification); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createNotification,deleteNotification,updateNotification,getAllNotifications,findOneNotification};