const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); 

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id',userController.deleteUser);
router.patch('/:id',userController.updateUser);
router.get('/:id',userController.findOneUser);

module.exports=router;