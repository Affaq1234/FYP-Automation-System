const Group=require('./Group');
const createGroup = async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteGroup = async (req, res) => {
    try {
      const { id } = req.params;
      await Group.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedGroup);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneGroup = async (req, res) => {
    try {
      const { id } = req.params; 
      const group = await Group.findById(id); 
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(group); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const findGroupByStudentRegNo = async (req, res) => {
    try {
        const { regNo } = req.body;

        if (!regNo) {
            return res.status(400).json({ message: "Student registration number is required in the request body." });
        }

        const group = await Group.findOne({ studentsRegno: regNo });

        if (!group) {
            return res.status(404).json({ message: "Group not found for the given registration number." });
        }

        res.status(200).json(group);
    } catch (error) {
        console.error("Error finding group by student regNo:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getGroupByGroupNo = async (req, res) => {
  try {
    const group = await Group.findOne({ groupNo: req.params.groupNo });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupsByProjectID = async (req, res) => {
  try {
    const groups = await Group.find({ projectID: req.params.projectID });
    if (groups.length === 0) {
      return res.status(404).json({ message: "No groups found for this project" });
    }
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupsBySupervisorID = async (req, res) => {
  try {
    const groups = await Group.find({ supervisorID: req.params.supervisorID });
    if (groups.length === 0) {
      return res.status(404).json({ message: "No groups found for this supervisor" });
    }
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupsByEvaluatorID = async (req, res) => {
  try {
    const groups = await Group.find({ evaluatorID: req.params.evaluatorID });
    if (groups.length === 0) {
      return res.status(404).json({ message: "No groups found for this evaluator" });
    }
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports={createGroup,deleteGroup,updateGroup,getAllGroups,findOneGroup,findGroupByStudentRegNo,getGroupByGroupNo,getGroupsByEvaluatorID,getGroupsBySupervisorID,getGroupsByProjectID};