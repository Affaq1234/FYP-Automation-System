const express = require('express');
const router = express.Router();
const feedbackController = require('./FeedbackController'); 

router.get('/', feedbackController.getAllFeedbacks);
router.post('/', feedbackController.createFeedback);
router.delete('/:id',feedbackController.deleteFeedback);
router.patch('/:id',feedbackController.updateFeedback);
router.get('/:id',feedbackController.findOneFeedback);

module.exports=router;