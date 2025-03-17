const Milestone=require('./Milestone');
const createMilestone = async (req, res) => {
    try {
        const newMilestone = new Milestone(req.body);
        await newMilestone.save();
        res.status(201).json(newMilestone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllMilestones = async (req, res) => {
    try {
        const milestones = await Milestone.find();
        res.status(200).json(milestones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteMilestone = async (req, res) => {
    try {
      const { id } = req.params;
      await Milestone.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateMilestone = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMilestone = await Milestone.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedMilestone);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneMilestone = async (req, res) => {
    try {
      const { id } = req.params; 
      const milestone = await Milestone.findById(id); 
  
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found' });
      }
  
      res.status(200).json(milestone); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createMilestone,deleteMilestone,updateMilestone,getAllMilestones,findOneMilestone};