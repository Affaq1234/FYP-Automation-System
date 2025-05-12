const express = require('express');
const router = express.Router();
const studentController = require('./StudentController'); 

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.post('/regNo',studentController.findOneStudentRegNo);
router.get('/user/:id',studentController.findOneStudentUserId);
router.delete('/:id',studentController.deleteStudent);
router.patch('/:id',studentController.updateStudent);
router.get('/:id',studentController.findOneStudent);

module.exports=router;