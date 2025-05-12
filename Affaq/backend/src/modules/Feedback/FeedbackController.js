const Feedback=require('./Feedback');
const createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      await Feedback.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedFeedback);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneFeedback = async (req, res) => {
    try {
      const { id } = req.params; 
      const feedback = await Feedback.findById(id); 
  
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      res.status(200).json(feedback); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getFeedbackByFacultyId = async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ facultyId: req.params.facultyId });
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getFeedbackByGroupId = async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ groupId: req.params.groupId });
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports={createFeedback,deleteFeedback,updateFeedback,getAllFeedbacks,findOneFeedback,getFeedbackByFacultyId,getFeedbackByGroupId};