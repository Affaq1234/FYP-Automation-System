const Task=require('./Task')
const Group=require('../Group/Group')
const Milestone=require('../Milestone/Milestone')

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
const findTasksByMilestoneId = async (req, res) => {
    try {
      const { milestoneId } = req.params;
  
      const tasks = await Task.find({ milestoneId });
  
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this milestone' });
      }
  
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getTasksByGroupNo = async (req, res) => {
    try {
      const { groupNo } = req.params;
  
      const group = await Group.findOne({ groupNo });
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      const { projectID } = group;
  
      const milestones = await Milestone.find({ projectID });
      if (!milestones.length) {
        return res.status(404).json({ message: "No milestones found for this project" });
      }
  
      const milestoneIds = milestones.map(m => m._id.toString());
  
      const tasks = await Task.find({ milestoneId: { $in: milestoneIds } });
  
      return res.status(200).json({ tasks });
  
    } catch (error) {
      console.error("Error fetching tasks by groupNo:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };

module.exports={createTask,updateTask,deleteTask,findOneTask,getAllTasks,findTasksByMilestoneId,getTasksByGroupNo};