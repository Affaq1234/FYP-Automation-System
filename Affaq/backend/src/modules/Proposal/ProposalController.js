const Proposal = require("./Proposal");
const fs = require("fs");
const path = require("path");

const createProposal = async (req, res) => {
  try {
    const newProposal = new Proposal(req.body);
    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const Proposals = await Proposal.find();
    res.status(200).json(Proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;
    await Proposal.findByIdAndDelete(id);
    res.status(204).json({ Status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProposal = await Proposal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findOneProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const Proposal1 = await Proposal.findById(id);

    if (!Proposal1) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json(Proposal1);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
async function convertFileToBuffer(filePath) {
  try {
    const MAX_FILE_SIZE_MB = 16;
    const MAX_FILE_SIZE_BYTES = 16 * 1024 * 1024;
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist at path: ${filePath}`);
    }

    const fileStats = fs.statSync(filePath);
    if (fileStats.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. File size: ${(
          fileStats.size /
          (1024 * 1024)
        ).toFixed(2)} MB`
      );
    }

    const fileData = fs.readFileSync(filePath);
    const buffer = Buffer.from(fileData);
    const fileName = path.basename(filePath);

    console.log("File converted to buffer successfully.");
    return { buffer, fileName };
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function saveBufferToFile(bufferData, outputPath) {
  try {
      fs.writeFileSync(outputPath, bufferData);
      console.log(`File saved successfully at: ${outputPath}`);
  } catch (error) {
      console.error('Error:', error.message);
      throw error;
  }
}

const findByGroupId = async (req, res) => {
  try {
    const { id } = req.params;
    const prop = await Proposal.findOne({groupID: id });

    if (!prop) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json(prop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findBySupervisorId = async (req, res) => {
  try {
    const { id } = req.params;
    const prop = await Proposal.findOne({supervisorID: id });

    if (!prop) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json(prop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProposal,
  deleteProposal,
  updateProposal,
  getAllProposals,
  findOneProposal,
  findByGroupId,
  findBySupervisorId
};
