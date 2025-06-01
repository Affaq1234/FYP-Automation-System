const express = require('express');
const router = express.Router();
const groupController = require('./GroupController'); 

router.get('/', groupController.getAllGroups);
router.post('/', groupController.createGroup);
router.get('/:groupNo/members', groupController.getGroupMembersDetails);
router.post('/student',groupController.findGroupByStudentRegNo);
router.get('/facultyAdvisor/:supervisorID',groupController.getGroupsBySupervisorID);
router.get('/project/:projectID',groupController.getGroupsByProjectID);
router.get('/evaluator/:evaluatorID',groupController.getGroupsByEvaluatorID);
router.get('/group/:groupNo',groupController.getGroupByGroupNo);
router.delete('/:id',groupController.deleteGroup);
router.patch('/:id',groupController.updateGroup);
router.get('/:id',groupController.findOneGroup);

module.exports=router;