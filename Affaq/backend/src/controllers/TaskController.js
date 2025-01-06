const Task=require('../models/Task')
const createTask =async (req,res)=>{
    try{
        const newTask=new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(error)
    {
        res.status(400).json({ message: error.message });
    }
};
const getAllTasks = async (req,res)=>{
    try
    {
        const tasks=await Task.find();
        res.status(200).json(tasks);
    }catch(error)
    {
        res.status(500).json({ message: error.message });
    }
};
const deleteTask =async(req,res)=>{
    try{
        const {id} = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).json({"Status":"Success"});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
    }
};
const updateTask =async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedTask= await Task.findByIdAndUpdate(id,req.body,{new: true});
        res.status(204).send(updateTask);
    }catch(error)
    {
        res.status(500).json({ message: error.message });
    }
};
const findOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={createTask,updateTask,deleteTask,findOneTask,getAllTasks};