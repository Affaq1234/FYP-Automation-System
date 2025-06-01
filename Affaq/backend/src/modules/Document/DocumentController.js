const Document=require('./Document');
const createDocument = async (req, res) => {
  try {
    const { title, groupNo, supervisorID, description, status, attachmentName, evaluatorId } = req.body;
    
    // Convert base64 to Buffer
    const buffer = Buffer.from(req.body.attachment, 'base64');
    
    const newDocument = new Document({
      title,
      groupNo,
      supervisorID,
      description,
      attachmentName,
      attachment: buffer,
      uploadedBy
    });

    await newDocument.save();
    const { attachment, ...newDocument1 } = newDocument;
    res.status(201).json(newDocument1);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const getDocumentsByProjectId = async (req, res) => {
    try {
      const documents = await Document.find({ projectID: req.params.projectID });
      
      if (documents.length === 0) {
        return res.status(404).json({ message: "No documents found for this project ID" });
      }
      
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getDocumentAttachment = async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
  
      if (!document || !document.attachment) {
        return res.status(404).json({ message: "Document or attachment not found" });
      }
  
      // Get the file buffer directly from MongoDB
      const fileBuffer = document.attachment;
  
      // Determine content type based on file extension
      const ext = document.attachmentName.split('.').pop().toLowerCase();
      const contentType = getContentType(ext);
  
      // Set headers
      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(document.attachmentName)}"`,
        'Content-Length': fileBuffer.length
      });
  
      // Send the raw buffer
      res.send(fileBuffer);
    } catch (error) {
      console.error("Error fetching document attachment:", error);
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
  const findByGroupId = async (req, res) => {
    try {
        const { groupNo } = req.params;
  
        if (!groupNo) {
            return res.status(400).json({ message: 'groupNo parameter is required' });
        }
  
        // Find documents by groupNo, excluding the file buffer
        const documents = await Document.find({ groupNo }).select('-attachment');
  
        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found for this groupNo' });
        }
  
        const metadataList = documents.map(document => ({
            id: document._id,
            title:document.title,
            groupNo: document.groupNo,
            supervisorID: document.supervisorID,
            description: document.description,
            status: document.status,
            attachmentName: document.attachmentName,
            evaluatorId: document.evaluatorId,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt
        }));
  
        res.status(200).json({ metadata: metadataList });
    } catch (error) {
        console.error('Error fetching documents by groupNo:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
  const findBySupervisorId = async(req,res)=>{
    try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'groupNo parameter is required' });
      }

      // Find documents by groupNo, excluding the file buffer
      const documents = await Document.find({ supervisorID:id }).select('-attachment');

      if (documents.length === 0) {
          return res.status(404).json({ message: 'No documents found for this groupNo' });
      }

      const metadataList = documents.map(document => ({
          id: document._id,
          title:document.title,
          groupNo: document.groupNo,
          supervisorID: document.supervisorID,
          description: document.description,
          status: document.status,
          attachmentName: document.attachmentName,
          evaluatorId: document.evaluatorId,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt
      }));

      res.status(200).json({ metadata: metadataList });
  } catch (error) {
      console.error('Error fetching documents by groupNo:', error);
      res.status(500).json({ message: 'Server error' });
  }
  }
  
  module.exports={createDocument,deleteDocument,updateDocument,getAllDocuments,findOneDocument,getDocumentsByProjectId,findByGroupId,getDocumentAttachment,findBySupervisorId};