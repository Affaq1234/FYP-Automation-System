const express = require('express');
const router = express.Router();
const taskController = require('./TaskController'); 

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id',taskController.deleteTask);
router.patch('/:id',taskController.updateTask);
router.get('/:id',taskController.findOneTask);

module.exports=router;