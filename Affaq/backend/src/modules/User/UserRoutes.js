const express = require('express');
const router = express.Router();
const userController = require('./UserController'); 

router.post('/signup',userController.signup);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id',userController.deleteUser);
router.patch('/:id',userController.updateUser);
router.get('/:id',userController.findOneUser);
router.post('/login',userController.login);

module.exports=router;