const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController'); 

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.delete('/:id',projectController.deleteProject);
router.patch('/:id',projectController.updateProject);
router.get('/:id',projectController.findOneProject);

module.exports=router;