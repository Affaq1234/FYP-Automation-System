const express = require('express');
const router = express.Router();
const adminController = require('./AdminController'); 

router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);
router.delete('/:id',adminController.deleteAdmin);
router.patch('/:id',adminController.updateAdmin);
router.get('/:id',adminController.findOneAdmin);

module.exports=router;