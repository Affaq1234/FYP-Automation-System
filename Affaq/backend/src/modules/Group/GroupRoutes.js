const express = require('express');
const router = express.Router();
const groupController = require('./GroupController'); 

router.get('/', groupController.getAllGroups);
router.post('/', groupController.createGroup);
router.delete('/:id',groupController.deleteGroup);
router.patch('/:id',groupController.updateGroup);
router.get('/:id',groupController.findOneGroup);

module.exports=router;