const express = require('express');
const router = express.Router();
const deadlineController = require('../controllers/DeadlineController'); 

router.get('/', deadlineController.getAllDeadlines);
router.post('/', deadlineController.createDeadline);
router.delete('/:id',deadlineController.deleteDeadline);
router.patch('/:id',deadlineController.updateDeadline);
router.get('/:id',deadlineController.findOneDeadline);

module.exports=router;