const Document=require('../models/Document');
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
  module.exports={createDocument,deleteDocument,updateDocument,getAllDocuments,findOneDocument};