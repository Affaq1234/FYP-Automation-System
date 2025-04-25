const express = require('express');
const router = express.Router();
const NotificationController = require('./NotificationController'); 

router.get('/', NotificationController.getAllNotifications);
router.post('/', NotificationController.createNotification);
router.delete('/:id',NotificationController.deleteNotification);
router.patch('/:id',NotificationController.updateNotification);
router.get('/:id',NotificationController.findOneNotification);

module.exports=router;