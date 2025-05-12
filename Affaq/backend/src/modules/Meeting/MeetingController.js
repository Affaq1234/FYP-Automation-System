const Meeting=require('./Meeting');
const createMeeting = async (req, res) => {
    try {
        const newMeeting = new Meeting(req.body);
        await newMeeting.save();
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteMeeting = async (req, res) => {
    try {
      const { id } = req.params;
      await Meeting.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateMeeting = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedMeeting);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneMeeting = async (req, res) => {
    try {
      const { id } = req.params; 
      const meeting = await Meeting.findById(id); 
  
      if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
      }
      res.status(200).json(meeting); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getMeetingsByFacultyId = async (req, res) => {
    try {
      const meetings = await Meeting.find({ facultyId: req.params.facultyId });
      res.status(200).json(meetings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports={createMeeting,deleteMeeting,updateMeeting,getAllMeetings,findOneMeeting,getMeetingsByFacultyId};