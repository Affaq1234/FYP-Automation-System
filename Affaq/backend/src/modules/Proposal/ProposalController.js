const Proposal = require("./Proposal");
const fs = require("fs");
const path = require("path");

const createProposal = async (req, res) => {
  try {
    const { title, groupNo, supervisorID, description, status, attachmentName, evaluatorId } = req.body;
    
    // Convert base64 to Buffer
    const buffer = Buffer.from(req.body.attachment, 'base64');
    
    const newProposal = new Proposal({
      title,
      groupNo,
      supervisorID,
      description,
      status,
      attachmentName,
      attachment: buffer, // Store as Buffer
      evaluatorId
    });

    await newProposal.save();
    const { attachment, ...newProposal1 } = newProposal;
    res.status(201).json(newProposal1);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      const { groupNo } = req.params;

      if (!groupNo) {
          return res.status(400).json({ message: 'groupNo parameter is required' });
      }

      // Find proposals by groupNo, excluding the file buffer
      const proposals = await Proposal.find({ groupNo }).select('-attachment');

      if (proposals.length === 0) {
          return res.status(404).json({ message: 'No proposals found for this groupNo' });
      }

      const metadataList = proposals.map(proposal => ({
          id: proposal._id,
          title:proposal.title,
          groupNo: proposal.groupNo,
          supervisorID: proposal.supervisorID,
          description: proposal.description,
          status: proposal.status,
          attachmentName: proposal.attachmentName,
          evaluatorId: proposal.evaluatorId,
          createdAt: proposal.createdAt,
          updatedAt: proposal.updatedAt
      }));

      res.status(200).json({ metadata: metadataList });
  } catch (error) {
      console.error('Error fetching proposals by groupNo:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

const findBySupervisorId = async (req, res) => {
  try {
    const { id } = req.params;
    const prop = await Proposal.find({supervisorID: id });

    if (!prop) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json(prop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getProposalAttachment = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal || !proposal.attachment) {
      return res.status(404).json({ message: "Proposal or attachment not found" });
    }

    // Get the file buffer directly from MongoDB
    const fileBuffer = proposal.attachment;

    // Determine content type based on file extension
    const ext = proposal.attachmentName.split('.').pop().toLowerCase();
    const contentType = getContentType(ext);

    // Set headers
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(proposal.attachmentName)}"`,
      'Content-Length': fileBuffer.length
    });

    // Send the raw buffer
    res.send(fileBuffer);
  } catch (error) {
    console.error("Error fetching proposal attachment:", error);
    res.status(500).json({ message: "Server error while fetching attachment" });
  }
};

// Helper function to determine content type
function getContentType(ext) {
  const types = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
  return types[ext] || 'application/octet-stream';
}


module.exports = { getProposalAttachment };
module.exports = {
  createProposal,
  deleteProposal,
  updateProposal,
  getAllProposals,
  findOneProposal,
  findByGroupId,
  findBySupervisorId,
  getProposalAttachment
};
