const Document=require('./Document');
const createDocument = async (req, res) => {
    try {
        const newDocument = new Document(req.body);
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteDocument = async (req, res) => {
    try {
      const { id } = req.params;
      await Document.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedDocument = await Document.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedDocument);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneDocument = async (req, res) => {
    try {
      const { id } = req.params; 
      const document = await Document.findById(id); 
  
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document); 
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
  
  module.exports={createDocument,deleteDocument,updateDocument,getAllDocuments,findOneDocument};