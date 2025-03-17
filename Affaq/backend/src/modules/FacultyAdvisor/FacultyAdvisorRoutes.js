const express = require('express');
const router = express.Router();
const facultyAdvisorController = require('./FacultyAdvisorController'); 

router.get('/', facultyAdvisorController.getAllFacultyAdvisors);
router.post('/', facultyAdvisorController.createFacultyAdvisor);
router.delete('/:id',facultyAdvisorController.deleteFacultyAdvisor);
router.patch('/:id',facultyAdvisorController.updateFacultyAdvisor);
router.get('/:id',facultyAdvisorController.findOneFacultyAdvisor);

module.exports=router;