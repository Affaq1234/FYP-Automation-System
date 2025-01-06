const Admin=require('../models/Admin');
const createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedAdmin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneAdmin = async (req, res) => {
    try {
      const { id } = req.params; 
      const admin = await Admin.findById(id); 
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json(admin); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createAdmin,deleteAdmin,updateAdmin,getAllAdmins,findOneAdmin};