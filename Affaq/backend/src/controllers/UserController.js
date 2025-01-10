const User = require("../models/User");
const Admin = require('./models/Admin');
const Student = require('./models/Student');
const FacultyAdvisor = require('./models/FacultyAdvisor');


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
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    res.json({ userID: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const signup = async (req, res) => {
  const { username, email, password, role, additionalData } = req.body;

  if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required: username, email, password, role.' });
  }

  try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
          const errorField = existingUser.username === username ? 'Username' : 'Email';
          return res.status(400).json({ message: `${errorField} is already in use.` });
      }

      switch (role) {
          case 'Admin':
              if (!additionalData || !additionalData.name || !additionalData.permissions) {
                  return res.status(400).json({ message: 'Admin requires: name, permissions.' });
              }
              break;

          case 'Student':
              if (!additionalData || !additionalData.studentName || !additionalData.regNo) {
                  return res.status(400).json({ message: 'Student requires: studentName, regNo.' });
              }
              break;

          case 'FacultyAdvisor':
              if (!additionalData || !additionalData.Name) {
                  return res.status(400).json({ message: 'FacultyAdvisor requires: Name.' });
              }
              break;

          default:
              return res.status(400).json({ message: 'Invalid role specified.' });
      }

      const newUser = new User({ username, email, password, role });
      const savedUser = await newUser.save();
      const userId = savedUser._id.toString();

      switch (role) {
          case 'Admin':
              const newAdmin = new Admin({
                  userId,
                  name: additionalData.name,
                  permissions: additionalData.permissions,
              });
              await newAdmin.save();
              break;

          case 'Student':
              const newStudent = new Student({
                  userId,
                  studentName: additionalData.studentName,
                  regNo: additionalData.regNo,
              });
              await newStudent.save();
              break;

          case 'FacultyAdvisor':
              const newFacultyAdvisor = new FacultyAdvisor({
                  userId,
                  Name: additionalData.Name,
                  Meetings: additionalData.Meetings || [],
              });
              await newFacultyAdvisor.save();
              break;
      }
      res.status(201).json({ message: 'User registered successfully.', userId, role });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
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
