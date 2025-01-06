const Student=require("../models/Student")
const createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      await Student.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneStudent = async (req, res) => {
    try {
      const { id } = req.params; 
      const student = await Student.findById(id); 
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createStudent,updateStudent,deleteStudent,getAllStudents,findOneStudent};