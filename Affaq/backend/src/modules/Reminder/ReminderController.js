const Reminder=require('./Reminder');
const createReminder = async (req, res) => {
    try {
        const newReminder = new Reminder(req.body);
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteReminder = async (req, res) => {
    try {
      const { id } = req.params;
      await Reminder.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateReminder = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedReminder = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedReminder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneReminder = async (req, res) => {
    try {
      const { id } = req.params; 
      const reminder = await Reminder.findById(id); 
  
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
  
      res.status(200).json(reminder); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createReminder,deleteReminder,updateReminder,getAllReminders,findOneReminder};