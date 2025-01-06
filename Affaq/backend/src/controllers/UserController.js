const User=require('../models/User')
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneUser = async (req, res) => {
    try {
      const { id } = req.params; 
      const user = await User.findById(id); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
module.exports={createUser,getAllUsers,deleteUser,updateUser,findOneUser};