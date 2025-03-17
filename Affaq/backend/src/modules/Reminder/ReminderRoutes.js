const express = require('express');
const router = express.Router();
const reminderController = require('./ReminderController'); 

router.get('/', reminderController.getAllReminders);
router.post('/', reminderController.createReminder);
router.delete('/:id',reminderController.deleteReminder);
router.patch('/:id',reminderController.updateReminder);
router.get('/:id',reminderController.findOneReminder);

module.exports=router;