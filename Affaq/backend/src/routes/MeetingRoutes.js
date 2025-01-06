const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/MeetingController'); 

router.get('/', meetingController.getAllMeetings);
router.post('/', meetingController.createMeeting);
router.delete('/:id',meetingController.deleteMeeting);
router.patch('/:id',meetingController.updateMeeting);
router.get('/:id',meetingController.findOneMeeting);

module.exports=router;