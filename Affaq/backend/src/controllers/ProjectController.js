const Project=require('../models/Project');
const createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      await Project.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneProject = async (req, res) => {
    try {
      const { id } = req.params; 
      const project = await Project.findById(id); 
  
      if (!project) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
  
      res.status(200).json(project); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createProject,deleteProject,updateProject,getAllProjects,findOneProject};