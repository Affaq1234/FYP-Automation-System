const Admin=require('./Admin');
const mongoose = require('mongoose');
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
  const clearDatabase = async (req, res) => {
    try {
      const collections = Object.keys(mongoose.connection.collections);
  
      for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({});
      }
  
      res.status(200).json({ message: 'All data in the database has been cleared.' });
    } catch (error) {
      console.error('Failed to clear database:', error);
      res.status(500).json({ message: 'Error clearing database', error: error.message });
    }
  };
  module.exports={createAdmin,deleteAdmin,updateAdmin,getAllAdmins,findOneAdmin,clearDatabase};