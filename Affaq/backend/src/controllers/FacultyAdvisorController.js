const FacultyAdvisor=require('../models/FacultyAdvisor');
const createFacultyAdvisor = async (req, res) => {
    try {
        const newFacultyAdvisor = new FacultyAdvisor(req.body);
        await newFacultyAdvisor.save();
        res.status(201).json(newFacultyAdvisor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllFacultyAdvisors = async (req, res) => {
    try {
        const facultyadvisors = await FacultyAdvisor.find();
        res.status(200).json(facultyadvisors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteFacultyAdvisor = async (req, res) => {
    try {
      const { id } = req.params;
      await FacultyAdvisor.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateFacultyAdvisor = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFacultyAdvisor = await FacultyAdvisor.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedFacultyAdvisor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneFacultyAdvisor = async (req, res) => {
    try {
      const { id } = req.params; 
      const facultyAdvisor = await FacultyAdvisor.findById(id); 
  
      if (!facultyAdvisor) {
        return res.status(404).json({ message: 'Faculty Advisor not found' });
      }
      res.status(200).json(facultyAdvisor); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createFacultyAdvisor,deleteFacultyAdvisor,updateFacultyAdvisor,getAllFacultyAdvisors,findOneFacultyAdvisor};