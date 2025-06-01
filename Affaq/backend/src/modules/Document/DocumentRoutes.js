const express = require('express');
const router = express.Router();
const documentController = require('./DocumentController'); 

router.get('/', documentController.getAllDocuments);
router.post('/', documentController.createDocument);
router.get('/project/:projectID',documentController.getDocumentsByProjectId);
router.get('/group/:groupNo',documentController.findByGroupId);
router.get('/supervisor/:id',documentController.findBySupervisorId);
router.get('/attachment/:id',documentController.getDocumentAttachment);
router.delete('/:id',documentController.deleteDocument);
router.patch('/:id',documentController.updateDocument);
router.get('/:id',documentController.findOneDocument);

module.exports=router;