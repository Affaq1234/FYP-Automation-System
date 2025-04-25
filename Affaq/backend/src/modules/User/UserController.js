const User = require("./User");
const Student=require("../Student/Student");
const mongoose=require("mongoose")

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

const login = async (req, res) => {
  const { email, password, role } = req.body;

  // Basic input validation
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Email, password, and role are required.' });
  }

  try {
    // Check for user with given email and role
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Simple password comparison
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};


const signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const { username, email, password, role, studentName, regNo, isGrouped } = req.body;

      if (!username || !email || !password || !role || !studentName || !regNo) {
          return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: "Email is already registered." });
      }

      const existingStudent = await Student.findOne({ regNo });
      if (existingStudent) {
          return res.status(409).json({ message: "Registration number already exists." });
      }

      const newUser = new User({
          username,
          email,
          password, 
          role
      });

      const savedUser = await newUser.save({ session });

      const newStudent = new Student({
          userId: savedUser._id.toString(),
          studentName,
          regNo,
          isGrouped
      });

      await newStudent.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({ message: "Signup successful." });

  } catch (err) {
      await session.abortTransaction();
      session.endSession();

      console.error("Signup error:", err);

      if (err.code === 11000) {
          const duplicateField = Object.keys(err.keyValue)[0];
          return res.status(409).json({
              message: `Duplicate value for field: ${duplicateField}.`
          });
      }

      return res.status(500).json({ message: "Internal server error." });
  }
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
