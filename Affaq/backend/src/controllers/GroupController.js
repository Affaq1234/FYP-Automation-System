const Group=require('../models/Group');
const createGroup = async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteGroup = async (req, res) => {
    try {
      const { id } = req.params;
      await Group.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedGroup);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneGroup = async (req, res) => {
    try {
      const { id } = req.params; 
      const group = await Group.findById(id); 
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(group); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createGroup,deleteGroup,updateGroup,getAllGroups,findOneGroup};