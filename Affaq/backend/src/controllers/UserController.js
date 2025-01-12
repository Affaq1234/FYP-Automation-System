const User = require("../models/User");

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
    res.status(204).json({ Status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login= async (req,res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // If the password doesn't match
    if (password!=user.password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Return user information upon successful login
    return res.status(200).json({
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


const signup = async (req, res) => {
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  findOneUser,
  login,
  signup
};
