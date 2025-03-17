const express = require('express');
const router = express.Router();
const milestoneController = require('./MilestoneController'); 

router.get('/', milestoneController.getAllMilestones);
router.post('/', milestoneController.createMilestone);
router.delete('/:id',milestoneController.deleteMilestone);
router.patch('/:id',milestoneController.updateMilestone);
router.get('/:id',milestoneController.findOneMilestone);

module.exports=router;