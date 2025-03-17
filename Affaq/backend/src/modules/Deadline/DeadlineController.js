const Deadline=require('./Deadline');
const createDeadline = async (req, res) => {
    try {
        const newDeadline = new Deadline(req.body);
        await newDeadline.save();
        res.status(201).json(newDeadline);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllDeadlines = async (req, res) => {
    try {
        const deadlines = await Deadline.find();
        res.status(200).json(deadlines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteDeadline = async (req, res) => {
    try {
      const { id } = req.params;
      await Deadline.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateDeadline = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedDeadline = await Deadline.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedDeadline);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneDeadline = async (req, res) => {
    try {
      const { id } = req.params; 
      const deadline = await Deadline.findById(id); 
  
      if (!deadline) {
        return res.status(404).json({ message: 'Deadline not found' });
      }
      res.status(200).json(deadline); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createDeadline,deleteDeadline,updateDeadline,getAllDeadlines,findOneDeadline};