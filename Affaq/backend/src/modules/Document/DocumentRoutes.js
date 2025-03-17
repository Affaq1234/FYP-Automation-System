const express = require('express');
const router = express.Router();
const documentController = require('./DocumentController'); 

router.get('/', documentController.getAllDocuments);
router.post('/', documentController.createDocument);
router.delete('/:id',documentController.deleteDocument);
router.patch('/:id',documentController.updateDocument);
router.get('/:id',documentController.findOneDocument);

module.exports=router;